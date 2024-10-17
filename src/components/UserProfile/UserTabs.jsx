import PropTypes from "prop-types";
import ProfileDesigns from "./ProfileDesigns";
import ProfileFav from "./ProfileFav";
import ProfileOrders from "./ProfileOrders";

export default function UserTabs({  userOrders, favoriteProducts, designs }) {
  return (
    <div role="tablist" className="tabs tabs-lifted">
      <input type="radio" name="my_tabs_2" role="tab" className="tab w-32" aria-label=" Favorites" defaultChecked />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <ProfileFav favoriteProducts={favoriteProducts} />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab w-32 "
        aria-label=" Designs"
      />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <ProfileDesigns designs={designs} />
      </div>

      <input type="radio" name="my_tabs_2" role="tab" className="tab w-32" aria-label=" Orders" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <ProfileOrders userOrders={userOrders} />
      </div>
    </div>
  );
}

UserTabs.propTypes = {
    userOrders: PropTypes.array,
    favoriteProducts: PropTypes.array,
    designs: PropTypes.array,
  };