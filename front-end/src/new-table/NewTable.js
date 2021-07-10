import React from "react";
import {useHistory} from "react-router-dom";

function NewTable(){
    const history = useHistory();
    return <main>
        <h1>Create Table</h1>
        <form onSubmit={() => history.push("/dashboard")}>
        <div className="container-fluid">
            <label htmlFor="table_name">
                Table Name:
                <input type="text" name="table_name" id="table_name" minLength="2" required="required"/>
            </label>
            </div>
            <div className="container-fluid">
            <label htmlFor="capacity">
                Capacity:
                <input name="capacity" id="capacity" type="number" min="1" required="required"/>
            </label>
            </div>
            <div className="btn btn-group" role="group" aria-label="new-table-group">
            <button type="button" className="btn btn-dark btn-outline-light" onClick={() => history.goBack()}>Cancel</button>
            <button type="submit" className="btn btn-dark btn-outline-light">Submit</button>
            </div>
        </form>
    </main>
}

export default NewTable;