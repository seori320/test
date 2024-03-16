import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Welcome to Post Post!</h1>
                <p className="lead">
                    Explore and engage with the community. Share your thoughts, ask questions,
                    and connect with others through this SPA post.
                </p>
                <hr className="my-4" />
                <p>
                    Ready to get started? Check out the latest posts or create your own.
                </p>
				<Link to="/postlist">
					<button className="btn btn-primary btn-lg">Go to Post List</button>
				</Link>
				<br></br><br></br>
                <div className="mt-4">
                    <h5>📧Contact me email</h5>
						- &nbsp;
						<a href="/">44444444444444444444</a>

                </div>
            </div>
        </div>
    );
}

export default Home;