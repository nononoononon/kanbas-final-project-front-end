import React, {useState} from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function GetModule() {
    const [module, setModule] = useState({
        id: 1,
        name: "first module",
        description: "the first module",
        course: "web dev 01"
    });

    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
    return (
        <div id="wd-working-with-objects">
            <h3>Get Module</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-module" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/module`}
               target="_blank"
               rel="noopener noreferrer">
                Get Module
            </a>
            <hr/>
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/module/name`}
               target="_blank"
               rel="noopener noreferrer">
                Get Module Name
            </a>
            <hr/>
            <h4>Modifying Properties</h4>

            {/* Module Name Update */}

            <a id="wd-update-module-name" className="btn btn-primary float-end"
               href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input
                className="form-control w-75"
                value={module.name}
                onChange={(e) => setModule({...module, name: e.target.value})}
            />
            <br/><br/>

            {/* Module Description Update */}
            <a id="wd-update-module-description" className="btn btn-primary float-end"
               href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Description
            </a>
            <input
                type="text"
                className="form-control w-75"
                value={module.description}
                onChange={(e) => setModule({...module, description: e.target.value})}
            />
            <hr/>
        </div>
    );
}