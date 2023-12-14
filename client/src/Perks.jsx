import React from 'react'
import { FaWifi } from "react-icons/fa";
import { GiFoodChain, GiShower } from "react-icons/gi";
import { FaCar } from "react-icons/fa6";
import { MdOutlineFastfood } from "react-icons/md";
import { FaDisplay } from "react-icons/fa6";
import { MdPool } from "react-icons/md";

const Perks = ({selected, onChange}) => {
  return (
    <>
        <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' />
            <FaWifi />
            <span>Free Wifi</span>
            </label> 
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' />
            <GiShower />
            <span>Hot Water</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' />
            <FaCar />
            <span>Free Parking Spot</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' />
            <MdOutlineFastfood />
            <span>Dining</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' />
            <FaDisplay />
            <span>TV</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' />
            <MdPool />
            <span>Pool</span>
        </label>
    </>
  )
}

export default Perks