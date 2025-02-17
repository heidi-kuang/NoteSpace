import SettingsToolTip from "./ui/SettingsToolTip"

const Debug = () => {
  const tip = "How much width you want to add, as a percentage of the original width."
  return (
    <div className="flex justify-center">
      <p>Debug</p>
      <div
        style={{width: "100px"}}
        className="border-black border-2 flex justify-end"
      >
        <SettingsToolTip tip={tip}/>
      </div>
     
    </div>
  )
}

export default Debug