import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/footer/Footer";
import Error from "./components/pages/error/Error";
import {protectedRoutes,adminRoutes} from "./routes/protected";
import publicRoutes from "./routes/public";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserDetails } from "./axios/user";
import { setUserAuth, unsetUserAuth } from "./redux/actions/userAuthentication";
import { updateClassrooms } from "./redux/actions/enrolledClassrooms";
import { updateThemes } from "./redux/actions/theme";
import { updateUser } from "./redux/actions/user";
import { setLoading, unsetLoading } from "./redux/actions/loading";
import SyncLoader from "react-spinners/SyncLoader";

function App() {
    const userAuthentication = useSelector((state) => state.userAuthentication);
    const user = useSelector((state) => state.user);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    /******************   useEffect()   **************/
    //fetch user data from server
    useEffect(() => {
        const computeThemeList = (enrolledClassrooms) => {
            let result = {};
            for (let i = 0; i < enrolledClassrooms.length; i++) {
                result[enrolledClassrooms[i]._id] = enrolledClassrooms[i].theme;
            }
            return result;
        };
        dispatch(setLoading());
        if(!user._id)
        fetchUserDetails()
            .then((resp) => {
                // console.log('fetchUserDetails_resp:',resp);
                dispatch(updateUser(resp.data));
                dispatch(setUserAuth())

                //enrolledClassrooms
                const enrolledClassrooms = resp.data.classroomIDs || [];
                dispatch(updateThemes(computeThemeList(enrolledClassrooms)));
                dispatch(updateClassrooms(enrolledClassrooms.reverse()));
                dispatch(unsetLoading());
            })
            .catch((err) => {
                console.error(err);
                dispatch(unsetUserAuth())
                dispatch(unsetLoading());
            });
    }, [dispatch,user,userAuthentication]);

    /******************   useEffect()   **************/
    return (
        <div className="app" style={!userAuthentication ? { margin: "0px" } : {}}>
            {userAuthentication ? (
                <header className="l-header">
                    <Navbar />
                </header>
            ) : null}
            <main className="l-main" style={!userAuthentication ? { height: "calc(100vh)" } : {}}>
                <div className="spinner">
                    <SyncLoader size={20} margin={5} color="#BD10E0" loading={loading} />
                    {loading ? <div>Loading...</div> : null}
                </div>
                <Switch>
                    {!loading && !userAuthentication
                        ? publicRoutes.map((route, index) => {
                              return <Route key={index} exact path={route.path} component={route.component} />;
                          })
                        : null}
                    {userAuthentication ? (user.role?.toLowerCase()==='admin'?adminRoutes:protectedRoutes).map((route, index) => <Route key={index} exact path={route.path} component={route.component} />) : null}
                    {loading ? null : <Route exact path="*" component={Error} />}
                </Switch>
            </main>
            {userAuthentication ? (
                <footer className="l-footer">
                    <Footer />
                </footer>
            ) : null}
        </div>
    );
}

export default App;
