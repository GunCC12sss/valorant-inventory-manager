import { React, useEffect, useState } from 'react';

//utilities
import { makeStyles, useTheme } from '@material-ui/core/styles';

//components
import { Grid, Grow, Typography, Paper, Fade, Collapse } from '@material-ui/core'

const stockImageSize = "250px";
const scaleOverrides = {
    //fisrt num = base width, second num == number to add for larger width
    "29a0cfab-485b-f5d5-779a-b59f85e204a8": ["100px", "20px"], //classic
    "42da8ccc-40d5-affc-beec-15aa47b42eda": ["130px", "30px"], //shorty
    "44d4e95c-4157-0037-81b2-17841bf2e8e3": ["100px", "10px"], //frenzy
    "1baa85b4-4c70-1284-64bb-6481dfc3bb4e": ["140px", "35px"], //ghost
    "e336c6b8-418d-9340-d77f-7a9e4cfe0702": ["140px", "20px"], //sheriff

    "f7e1b454-4ad4-1063-ec0a-159e56b58941": ["195px", "20px"], //stinger
    "462080d1-4035-2937-7c09-27aa2a5c27a7": ["200px", "20px"], //spectre

    "910be174-449b-c412-ab22-d0873436b21b": ["240px", "40px"], //bucky
    "ec845bf4-4f79-ddda-a3da-0db3774b2794": ["240px", "30px"], //judge

    "ae3de142-4d85-2547-dd26-4e90bed35cf7": ["240px", "20px"], //bulldog
    "4ade7faa-4cf1-8376-95ef-39884480959b": ["240px", "60px"], //guardian
    "ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a": ["250px", "30px"], //phantom
    "9c82e19d-4575-0200-1a81-3eacf00cf872": ["240px", "30px"], //vandal

    "c4883e50-4494-202c-3ec3-6b8a9284f00b": ["250px", "70px"], //marshal
    "a03b24d3-4319-996d-0f8c-94bbfba1dfc7": ["240px", "100px"], //operator

    "55d8a0f4-4274-ca67-fe2c-06ab45efdf58": ["260px", "80px"], //ares
    "63e6c2b6-4a8e-869c-3d4c-e38355226584": ["270px", "40px"], //odin

    "2f59173c-4bed-b6c3-2191-dea9b58be9c7": ["auto", "20px"], //melee
}

const useStyles = makeStyles((theme) => ({

    "@global": {
        "@keyframes fadeOut": {
            "0%": {
                transform: "rotate(-360deg)"
            },
            "100%": {
                transform: "rotate(0deg)"
            }
        }
    },

    weaponContainerVideo: {
        position: "absolute",
        objectFit: "cover",
        width: "auto",
        height: "auto",
    },

    weaponPaper: {
        flexDirection: "row",
        position: "relative",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        transition: ".5s ease !important",
        "&:hover": {
            border: `1px ${theme.palette.primary.main} solid`
        },
    },

    weaponImage: {
        zIndex: 1,
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        background: "transparent",
        // transition: ".25s ease !important",
        backfaceVisibility: "hidden",
    },

    bottomGradient: {
        //background: "linear-gradient(to bottom, rgba(0,0,0,0) 60%,rgba(255,255,255,.15) 100%)",
        zIndex: 5,
        width: "100%",
        height: "100%",
        top: "-100%",
    },

    dataContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        top: "-100%"
    },

    textContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignSelf: "flex-start",
        alignItems: "center",
        position: "relative",
        justifyContent: "center",
        backgroundPosition: "center",
        overflow: "visible",
        zIndex: 2,
    },

    buddyContainer: {
        display: "flex",
        maxWidth: "50px",
        height: "100%",
        position: "relative",
        right: 0,
        bottom: 7,
        zIndex: 2,
    },

    buddyImage: {
        width: "100%",
        height: "auto",
        objectFit: "contain",
        position: "relative",
        alignSelf: "flex-end",
    },

    weaponLabelHolder: {
        display: "flex",
        width: "80%",
        height: "50%",
        position: "relative",
        alignSelf: "flex-start",
        left: 12,
        bottom: -22,
    },

    weaponLabel: {
        textAlign: "left",
        width: "100%",
        flexGrow: 1,
        height: "auto",
        alignSelf: "flex-end",
        position: "relative",
        textOverflow: "ellipsis"
    },

}));


function Weapon(props) {

    const classes = useStyles();
    const theme = useTheme();

    var db = false;
    const [isUpdatingImage, setUpdatingImage] = useState(true);
    const [isUpdatingBuddy, setUpdatingBuddy] = useState(false);
    const [skinData, updateSkinData] = useState({});
    const [showSkinName, updateSkinNameVisibility] = useState(false);

    const [weaponImage, setImage] = useState("");

    const favorite = props.data !== undefined ? props.data.favorite : "";
    const locked = props.data !== undefined ? props.data.locked : "";

    useEffect(() => {
        if (props.data !== undefined) {
            var comparisonTarget = skinData !== null ? skinData.skin_image : ""
            if (db === false && props.data.skin_image !== comparisonTarget) {

                setUpdatingImage(true)
                setTimeout(() => {
                    setImage(props.data.skin_image)
                    updateSkinData(props.data);
                    setUpdatingImage(false);
                }, 300)

            }

            //update buddy
            if (props.data.buddy_name !== skinData.buddy_name) {

                setUpdatingBuddy(true);
                setTimeout(() => {
                    updateSkinData(props.data);
                    setUpdatingBuddy(false);
                }, 300);
            }
        }
    }, [props.data]);

    function onHover() {
        updateSkinNameVisibility(true);
    };

    function offHover() {
        updateSkinNameVisibility(false);
    };

    function select() {
        props.weaponEditorCallback(props.uuid);
    }

    return (
        <Fade in style={{ transitionDelay: '500ms' }}>
            <Paper
                className={classes.weaponPaper}
                variant="outlined"
                onMouseEnter={onHover}
                onMouseLeave={offHover}
                onMouseDown={select}

            >
                <Fade in={!isUpdatingImage}>
                    <div
                        className={classes.weaponImage}
                        style={{
                            //backgroundPosition: props.uuid === "2f59173c-4bed-b6c3-2191-dea9b58be9c7" ? "50% 35%" : (!props.useLargeWeaponImage ? "50% 40%" : "50% 50%"), 
                            backgroundPosition: !props.useLargeWeaponImage ? "50% 40%" : "50% 50%",
                            backgroundImage: skinData !== {} ? `url(${weaponImage})` : `url("https://media.valorant-api.com/weapons/${props.uuid}/displayicon.png")`,
                            backgroundSize: props.uuid !== "2f59173c-4bed-b6c3-2191-dea9b58be9c7" ? (!props.useLargeWeaponImage ? `${props.uuid in scaleOverrides ? scaleOverrides[props.uuid][0] : stockImageSize} auto` : `calc(${scaleOverrides[props.uuid][0]} + ${scaleOverrides[props.uuid][1]}) auto`) : "auto 80%",
                        }}
                    />
                </Fade>

                {/* <div className={classes.bottomGradient} /> */}

                <div className={classes.dataContainer}>
                    <div className={classes.textContainer}>
                        <div className={classes.weaponLabelHolder}>
                            <Typography className={classes.weaponLabel} variant="overline">{locked ? "🔒 " : null}{props.displayName}</Typography>
                        </div>
                        <div style={{ width: "80%", alignSelf: "flex-start", position: "relative", left: 12 }}>
                            <Collapse in={showSkinName}>
                                <Typography className={classes.weaponLabel} variant="body2" style={{ marginTop: "14px", marginBottom: "5px" }}>{favorite ? "❤ " : null}{skinData.skin_name}</Typography>
                            </Collapse>
                        </div>
                    </div>
                    <Grow in>
                        <div className={classes.buddyContainer} style={{ width: props.isSidearm ? "20%" : "14%" }}>
                            {props.uuid !== "2f59173c-4bed-b6c3-2191-dea9b58be9c7" ?
                                <img alt={skinData.buddy_name} className={classes.buddyImage} src={skinData.buddy_image !== "" ? skinData.buddy_image : null} />
                                : <img alt="" src="" />
                            }
                        </div>
                    </Grow>
                </div>
            </Paper>
        </Fade>
    )

}

export default Weapon