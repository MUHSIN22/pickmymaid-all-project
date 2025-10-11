import { IoCallOutline, PiHeartFill, PiHeartStraight, RiHome5Fill, RiHome5Line } from "../../Icons/Icons";

const bottomNavLinks = [
    {
        fillIcon: RiHome5Fill,
        outlineIcon: RiHome5Line,
        path: "",
        label: "Home"
    },
    {
        fillIcon: PiHeartFill,
        outlineIcon: PiHeartStraight,
        path: "/favorites",
        label: "Favorites"
    },
    {
        fillIcon: IoCallOutline,
        outlineIcon: IoCallOutline,
        path: "tel:+971566369736",
        label: "Call"
    }
]

export default bottomNavLinks;