import { useState } from "react";
import Maps from "./Maps";
import SearchBox from "./SearchBox";

function App() {
  const [selectedPosition, setSelectedPosition] = useState(null)
  console.log("selectedPosition", selectedPosition)

  return (
    <div className="App">
      
      <Maps selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition}/>
      <div className="search-wrapper">
        <SearchBox setSelectedPosition={setSelectedPosition} />
      </div>
    </div>
  );
}

export default App;
