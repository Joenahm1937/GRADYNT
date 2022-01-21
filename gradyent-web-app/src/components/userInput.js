import React, { useState } from 'react';

function UserInput(){
    const [searchWord, setSearchWord] = useState('');
    const submitValue = (event) => {
        if (event.keyCode === 13) {
            const serachDetails = {'Input' : searchWord,}
            console.log(serachDetails);
        }
    }
    return (
      <div className="UserInput">
        <input className = "TextField" type="text" placeholder="serach anything" onChange={e => setSearchWord(e.target.value)} onKeyDown={(e) => submitValue(e) }/>
        {/* <button className = "Submit" onClick={submitValue}>Submit</button> */}
      </div>
    );
}

export default UserInput;