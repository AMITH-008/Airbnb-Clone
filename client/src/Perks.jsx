import React from 'react'
import { FaWifi } from "react-icons/fa";
import { GiFoodChain, GiShower } from "react-icons/gi";
import { FaCar } from "react-icons/fa6";
import { MdOutlineFastfood } from "react-icons/md";
import { FaDisplay } from "react-icons/fa6";
import { MdPool } from "react-icons/md";

const Perks = ({selected, onChange}) => {
  const handleCBClick = (checked, name) => {
    if(checked) {
      onChange([...selected, name])
    } else {
       onChange(selected.filter( perk=> perk != name))
    }
    console.log(selected);
    alert(name);
  }
  return (
    <>
        <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' onChange={(e) => {
              handleCBClick(e.target.checked, "Free Wifi");
            }} />
            <FaWifi />
            <span>Free Wifi</span>
            </label> 
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' onChange={(e) => handleCBClick(e.target.checked, "Hot Water")}/>
            <GiShower />
            <span>Hot Water</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' onChange={(e) => handleCBClick( e.target.checked, "Free Parking Spot")}/>
            <FaCar />
            <span>Free Parking Spot</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' onChange={(e) => handleCBClick(e.target.checked, "Dining")}/>
            <MdOutlineFastfood />
            <span>Dining</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox' onChange={(e) => handleCBClick(e.target.checked, "TV")}/>
            <FaDisplay />
            <span>TV</span>
            </label>
            <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
            <input type='checkbox'onChange={(e) => handleCBClick(e.target.checked, "Pool")}/>
            <MdPool />
            <span>Pool</span>
        </label>
    </>
  )
}

export default Perks