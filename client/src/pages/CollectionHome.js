import { React, useEffect, useState } from 'react';

//utilities
import { makeStyles } from '@material-ui/core/styles';

//components
import Header from '../components/misc/Header.js'
import Footer from '../components/misc/Footer.js'
import WeaponEditor from '../components/weaponEditor/WeaponEditor.js'
import Collection from '../components/collection/Collection.js'

import socket from "../services/Socket";

import { Grid, Container, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    root: {
        height: "100vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
    },
}));


function CollectionHome(props) {

    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);
    const [selectedUuid, changeSelectedUuid] = useState("");
    const [inventoryData, updateInventoryData] = useState({});
    const [showWeaponEditor, setWeaponEditorState] = useState(false);
    const [loadout, setLoadout] = useState({});
    const [weaponEditor, setWeaponEditor] = useState();

    useEffect(() => {
        if (!loaded) {
            load();
            setLoaded(true);
        }

        function updatedLoadoutCallback(response) {
            console.log(response);
            setLoadout(response.loadout)
        }
        socket.subscribe("loadout_updated", updatedLoadoutCallback)
        //setInterval(() => updateInventory(), 5000); //might consider making this a manual refresh
    }, []);

    useEffect(() => {
        if (!showWeaponEditor) {
            document.title = "VSM // Collection"
        }
    }, [showWeaponEditor])

    function load() {
        updateInventory();
        updateLoadout();
        
        //setInterval(() => updateLoadout(), 5000);
    }

    async function updateInventory() {
        function callback(response) {
            updateInventoryData(response.skins);
        }
        socket.request({ "request": "fetch_inventory" }, callback)
    }

    async function updateLoadout() {
        function callback(response) {
            setLoadout(response);
        }
        socket.request({ "request": "fetch_loadout" }, callback)
    }

    function modificationMenu(uuid) {
        setWeaponEditorState(true);
        setWeaponEditor(<WeaponEditor weaponUuid={uuid} initialSkinData={loadout[uuid]} inventoryData={inventoryData} loadoutWeaponData={loadout[uuid]} saveCallback={saveCallback} closeEditor={closeEditor} />)
    };

    async function saveCallback(payload, sameSkin) {

        function inventoryCallback(response) {
            updateInventoryData(response);
        }

        function putCallback(response) {
            setLoadout(response);
        }

        socket.request({ "request": "update_inventory", "args": { "payload": payload } }, inventoryCallback);
        if (!sameSkin) {
            socket.request({ "request": "put_weapon", "args": { "payload": payload } }, putCallback);
        }

    }

    function closeEditor() {
        setWeaponEditorState(false);
        setWeaponEditor(null);
    }

    return (
        <>
            <div className={classes.root}>
                <Header />
                <Container maxWidth={false}>
                    {weaponEditor}
                    <Collection weaponEditorCallback={modificationMenu} loadout={loadout} setLoadout={setLoadout} />
                </Container>
                <Footer />
            </div>
        </>
    )
}


export default CollectionHome