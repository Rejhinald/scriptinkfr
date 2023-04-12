import React from 'react';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container my-5">
    <h1 className="text-center" style={{fontWeight: "bold"}}>Welcome to ScriptInk</h1>
      <div className="d-flex justify-content-center my-4">
      </div>
      <div>
        <h2 className="text-center" style={{paddingTop: "0px", fontWeight: "bold"}}>Create and Monetize Your Work</h2>
        <p className="text-center" style={{margin:"0 25%"}}>Scriptink is a platform that writers use to receive funding from their fans or patrons. It is meant to be a continuous profit for small-time creators that allows them to easily sell their content in a public space.</p>
      </div>
      <div className="row">
      <div className="col-sm-6 d-flex justify-content-center" style={{paddingTop: "75px"}}>
          <div>
          <img src="https://i.imgur.com/E8q8Fuo.png" alt="image" className="img-center" 
            style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "350px", height: "350px", paddingBottom: "75px"}}/>
            <h2 className="text-center" style={{fontWeight: "bold"}}>Develop a recurring income stream</h2>
            <p className="text-center">Share what you make directly with your biggest fans, build a dedicated community and get paid the way you want to.</p>
          </div>
        </div>
        <div className="col-sm-6 d-flex justify-content-center" style={{paddingTop: "75px"}}>
          <div>
          <img src="https://i.imgur.com/vTRHlwc.png" alt="image" className="img-center" 
          style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "350px", height: "350px", paddingBottom: "75px"}}/>
            <h2 className="text-center" style={{fontWeight: "bold"}}>Take back creative control</h2>
            <p className="text-center">Create what you want and what your audience loves. You don’t have to conform to popular taste or the constraints of ad-based monetisation models.</p>
          </div>
        </div>
        <div className="col-sm-6 d-flex justify-content-center" style={{paddingTop: "75px"}}>
          <div>
          <img src="https://i.imgur.com/TWc48tJ.png" alt="image" className="img-center" 
            style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "350px", height: "350px", paddingBottom: "75px"}}/>
            <h2 className="text-center" style={{fontWeight: "bold"}}>Build a direct, meaningful connection with your audience</h2>
            <p className="text-center">No ads, no trolls, no algorithms. Enjoy direct access and deeper conversations with the people who matter the most.</p>
          </div>
        </div>
        <div className="col-sm-6 d-flex justify-content-center" style={{paddingTop: "75px"}}>
          <div>
          <img src="https://i.imgur.com/242HGAM.png" alt="image" className="img-center" 
          style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "350px", height: "350px", paddingBottom: "75px"}}/>
            <h2 className="text-center" style={{fontWeight: "bold"}}>Who uses ScriptInk?</h2>
            <p className="text-center">If you’re ready to take your work to the next level and willing to open your heart to your audience, Patreon is for you.</p>
          </div>
        </div> 
        <div>
        <h2 className="text-center" style={{paddingTop: "50px", fontWeight: "bold"}}>It's easier than you think!</h2>
        <p className="text-center" style={{margin:"0 25%", paddingBottom: "75 px"}}>There are many ways to delight your fans and every creator does this in their own way.</p>
      </div>
      <div>
          <img src="https://i.imgur.com/fS63er7.png" alt="image" className="img-left" 
            style={{display: "block", marginLeft: "auto", marginRight: "auto", paddingBottom: "75px", width: "1100px", height: "500px", paddingTop: "175 px"}}/>
      </div>
      <div>
        <h2 className="text-center" style={{paddingTop: "50px", fontWeight: "bold"}}>Ready to Start your Membership?</h2>
        <form class="d-flex">
        <Link className="btn btn-primary my-2 my-sm-0" type="login" style={{display: "block", marginLeft: "auto", marginRight: "auto"}} to="/signup">Get Started</Link>
      </form>
      </div>                     
      </div>
    </div>
  );
}

export default HomePage;
