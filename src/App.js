import './App.css';
import Layout from './components/layout/Layout';
import {Routes, Route} from 'react-router-dom';
import Park from './components/pages/Park';
import MakeReservations from './components/pages/MakeReservations';
import ShowReservation from './components/pages/ShowReservation';
import EditReservation from './components/pages/EditReservation';
import ShowAllParkings from './components/pages/ShowAllParkings';

function App() {

  const adminUser = false;

  return (
    <div className="App">
      <Layout>
        <h1>Iron Park</h1>
        <Routes>
                      <Route path='/admin/show-all-parkings' element={<ShowAllParkings/>} />
        </Routes>

        {true && 
                  (
                    <Routes>
                      <Route path='/admin/show-all-parkings' element={<ShowAllParkings/>} />
                    </Routes>
                  )
        }

        <div className="container">
          <div className="col-left">
              <p>Map content here..</p>
          </div>
          <div className="col-right">
              <p>Routing components</p>
              
                {!adminUser && 
                  (
                    <Routes>
                      <Route path='/' element={<Park/>} />
                      <Route path='/make-reservation/parking-id/:pid/user-id/:uid' element={<MakeReservations/>} />
                      <Route path='/show-reservation/reservation-id/:rid' element={<ShowReservation/>} />
                      <Route path='/edit-reservation/reservation-id/:rid' element={<EditReservation/>} />
                  </Routes>
                  )
                }

                
              
          </div>
        </div>

        

      </Layout>
    </div>
  );
}

export default App;
