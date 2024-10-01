
export default function ProfileFav() {
    return (
        <div className="col-span-2">
            <div className="card h-full bg-white shadow-md rounded-lg p-4">
                <div className="card-body">
                    <h6 className="flex items-center mb-3">
                        <i className="material-icons text-info mr-2">assignment</i>
                        Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3 h-2">
                        <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '80%' }}
                            aria-valuenow="80"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <small>Website Markup</small>
                    <div className="progress mb-3 h-2">
                        <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '72%' }}
                            aria-valuenow="72"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <small>One Page</small>
                    <div className="progress mb-3 h-2">
                        <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '89%' }}
                            aria-valuenow="89"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <small>Mobile Template</small>
                    <div className="progress mb-3 h-2">
                        <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '55%' }}
                            aria-valuenow="55"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                    <small>Backend API</small>
                    <div className="progress mb-3 h-2">
                        <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '66%' }}
                            aria-valuenow="66"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
