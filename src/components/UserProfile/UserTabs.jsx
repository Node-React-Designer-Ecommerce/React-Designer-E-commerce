import ProfileDesigns from "./ProfileDesigns";
import ProfileFav from "./ProfileFav";
import ProfileOrders from "./ProfileOrders";


export default function UserTabs() {
    return (
        <div role="tablist" className="tabs tabs-lifted">
            <input type="radio" name="my_tabs_2" role="tab" className="tab w-32" aria-label=" Favorites" defaultChecked/>
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <ProfileFav />

            </div>
            

            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab w-32 "
                aria-label=" Designs"
                 />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <ProfileDesigns />


            </div>

            <input type="radio" name="my_tabs_2" role="tab" className="tab w-32" aria-label=" Orders" />
            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <ProfileOrders />

            </div>
        </div>
    )
}
