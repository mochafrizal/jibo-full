import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  // Variabel animasi
  const navbarAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  // const contentAnimation = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: { opacity: 1, y: 0 },
  // };

  const footerAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="bg-black flex flex-col">
        {/* Navbar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={navbarAnimation}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Navbar />
        </motion.div>

        <div className="flex-grow">
          <Outlet />
        </div>
        {/* Footer */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={footerAnimation}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Footer />
        </motion.div>
      </div>
    </>
  );
}

export default App;



// function App() {

//   return (
//     <>
//       <div className="bg-black min-h-screen flex flex-col z-50">
//         <Navbar className='' />
//         <div className="flex-grow">
//           <Outlet />
//         </div>
//         <Footer />
//       </div>
//     </>
//   )
// }

// export default App
