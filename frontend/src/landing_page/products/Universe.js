// import React from "react";

// function Universe() {
//   return (
//     <div className="container mt-5">
//       <div className="row text-center">
//         <h1>The Zerodha Universe</h1>
//         <p>
//           Extend your trading and investment experience even further with our
//           partner platforms
//         </p>

//         <div className="col-4 p-3 mt-5">
//           <img src="media/images/smallcaseLogo.png" />
//           <p className="text-small text-muted">Thematic investment platform</p>
//         </div>
//         <div className="col-4 p-3 mt-5">
//           <img src="media/images/streakLogo.png" />
//           <p className="text-small text-muted">Algo & strategy platform</p>
//         </div>
//         <div className="col-4 p-3 mt-5">
//           <img src="media/images/sensibullLogo.svg" />
//           <p className="text-small text-muted">Options trading platform</p>
//         </div>
//         <div className="col-4 p-3 mt-5">
//           <img src="media/images/zerodhaFundhouse.png" />
//           <p className="text-small text-muted">Asset management</p>
//         </div>
//         <div className="col-4 p-3 mt-5">
//           <img src="media/images/goldenpiLogo.png" />
//           <p className="text-small text-muted">Bonds trading platform</p>
//         </div>
//         <div className="col-4 p-3 mt-5">
//           <img src="media/images/dittoLogo.png" />
//           <p className="text-small text-muted">insurance</p>
//         </div>
//         <button
//           className="p-2 btn btn-primary fs-5 mb-5"
//           style={{ width: "20%", margin: "0 auto" }}
//         >
//           Signup Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Universe;



import React from "react";

function Universe() {
  return (
    <div className="container mt-5 text-center">
      <h1>The Zerodha Universe</h1>
      <p>
        Extend your trading and investment experience even further with our
        partner platforms
      </p>

      {/* ROW 1 */}
      <div className="row mt-5">
        <div className="col-4 p-3">
          <img src="media/images/smallcaseLogo.png" className="img-fluid logo" />
          <p className="text-muted">Thematic investment platform</p>
        </div>

        <div className="col-4 p-3">
          <img src="media/images/streakLogo.png" className="img-fluid logo" />
          <p className="text-muted">Algo & strategy platform</p>
        </div>

        <div className="col-4 p-3">
          <img src="media/images/sensibullLogo.svg" className="img-fluid logo" />
          <p className="text-muted">Options trading platform</p>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="row">
        <div className="col-4 p-3">
          <img src="media/images/zerodhaFundhouse.png" className="img-fluid logo" />
          <p className="text-muted">Asset management</p>
        </div>

        <div className="col-4 p-3">
          <img src="media/images/goldenpiLogo.png" className="img-fluid logo" />
          <p className="text-muted">Bonds trading platform</p>
        </div>

        <div className="col-4 p-3">
          <img src="media/images/dittoLogo.png" className="img-fluid logo" />
          <p className="text-muted">Insurance</p>
        </div>
      </div>

      <button
        className="btn btn-primary fs-5 mt-4 mb-5"
        style={{ width: "200px" }}
      >
        Signup Now
      </button>
    </div>
  );
}

export default Universe;