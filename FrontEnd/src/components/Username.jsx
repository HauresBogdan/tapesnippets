import React from 'react';



function Username(params) {

  
    return (
        <>
           
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-user-tie" />
            </span>
          </div>
          <input type="text" name="username" className="form-control" placeholder="Name"  onChange={params.onChange}
            value={params.value} />
        </div>
        <br />

        </>
    );

}

export default Username;