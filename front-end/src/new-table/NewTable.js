import React from "react";
import {useHistory} from "react-router-dom";

function NewTable(){
    const history = useHistory();
    return <main>
        <h1>Enter the information for the new table below here:</h1>
        <form onSubmit={() => history.push("/dashboard")}>
            <label htmlFor="table_name">
                Table Name:
                <input type="text" name="table_name" id="table_name" minLength="2" required="required"/>
            </label>
            <label htmlFor="capacity">
                Capacity:
                <input name="capacity" id="capacity" type="number" min="1" required="required"/>
            </label>
            <button type="button" onClick={() => history.goBack()}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    </main>
}

export default NewTable;