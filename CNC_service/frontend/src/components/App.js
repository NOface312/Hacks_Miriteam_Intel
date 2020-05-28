import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Control from './control';
import Login from "./auth/login";
import Signup from "./auth/signup";

//Boss_Workshop Components
import Boss_Workshop_Main from './production_hierarchy/boss_workshop/main';
import Boss_Workshop_CNC_Manager from './production_hierarchy/boss_workshop/cnc_manager';
import Boss_Workshop_Page_With_Forms from './production_hierarchy/boss_workshop/page_with_forms';

//Boss_Area Components
import Boss_Area_Main from './production_hierarchy/boss_area/main';
import Boss_Area_CNC_Statistic from './production_hierarchy/boss_area/cnc_statistic';
import Boss_Area_Page_With_Forms from './production_hierarchy/boss_area/page_with_forms';

//Boss_Repair Components
import Boss_Repair_Service_Main from './production_hierarchy/boss_repair_service/main';
import Boss_Repair_Service_Page_With_Forms from './production_hierarchy/boss_repair_service/page_with_forms';


//Slave Components
import Slave_Main from './production_hierarchy/slave/main';


//Test Components
import API_Test from './test/api_test';
import Modale_Window_Test from './test/modale_window_test';


import { ControlRoute } from './../helpers/private_routes/control_route';
import { WorkshopRoute } from './../helpers/private_routes/type_routes/workshop_route';
import { AreaRoute } from './../helpers/private_routes/type_routes/area_route';
import { SlaveRoute } from './../helpers/private_routes/type_routes/slave_route';
import { RepairRoute } from './../helpers/private_routes/type_routes/repair_route';

class App extends Component {

    render() {
        return (
            <div className="site">
                <main>
                    <Switch>

                        <WorkshopRoute exact path={"/workshop/home/"} component={Boss_Workshop_Main} />
                        <WorkshopRoute exact path={"/workshop/cnc_manager/"} component={Boss_Workshop_CNC_Manager} />
                        <WorkshopRoute exact path={"/workshop/documents/"} component={Boss_Workshop_Page_With_Forms} />

                        <AreaRoute exact path={"/area/home/"} component={Boss_Area_Main} />
                        <AreaRoute exact path={"/area/cnc_statistic/"} component={Boss_Area_CNC_Statistic} />
                        <AreaRoute exact path={"/area/documents/"} component={Boss_Area_Page_With_Forms} />

                        <RepairRoute exact path={"/repair/home/"} component={Boss_Repair_Service_Main} />
                        <RepairRoute exact path={"/repair/documents/"} component={Boss_Repair_Service_Page_With_Forms} />

                        <SlaveRoute exact path={"/worker/home/"} component={Slave_Main} />

                        <ControlRoute exact path={"/"} component={Control} />

                        <Route exact path={"/test/"} component={API_Test} />

                        <Route exact path={"/login/"} component={ Login } />
                        <Route exact path={"/signup/"} component={ Signup } />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;