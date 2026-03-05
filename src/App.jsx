// // // import { Layout } from "antd";
// // // import TopBar from "./components/Layout/TopBar";
// // // import Sidebar from "./components/Layout/Sidebar";
// // // import EquipmentClassList from "./components/EquipmentClass/EquipmentClassList";

// // // const { Content } = Layout;

// // // const App = () => {
// // //   return (
// // //     <Layout style={{ minHeight: "100vh" }}>
// // //       <TopBar />
// // //       <Layout>
// // //         <Sidebar />
// // //         <Layout style={{ padding: "24px" }}>
// // //           <Content
// // //             style={{
// // //               background: "#fff",
// // //               padding: 24,
// // //               margin: 0,
// // //               minHeight: 280,
// // //             }}
// // //           >
// // //             <EquipmentClassList />
// // //           </Content>
// // //         </Layout>
// // //       </Layout>
// // //     </Layout>
// // //   );
// // // };

// // // export default App;

// // import { Layout } from "antd";
// // import TopBar from "./components/Layout/TopBar";
// // import Sidebar from "./components/Layout/Sidebar";
// // import EquipmentClassList from "./components/EquipmentClass/EquipmentClassList";

// // const { Content } = Layout;

// // const App = () => {
// //   return (
// //     <Layout style={{ minHeight: "100vh" }}>
// //       <TopBar />

// //       <Layout>
// //         <Sidebar />

// //         <Layout style={{ flex: 1 }}>
// //           <Content
// //             style={{
// //               padding: "24px",
// //               background: "#f5f5f5",
// //               minHeight: "100%",
// //             }}
// //           >
// //             <EquipmentClassList />
// //           </Content>
// //         </Layout>
// //       </Layout>
// //     </Layout>
// //   );
// // };

// // export default App;

// import { Layout } from "antd";
// import TopBar from "./components/Layout/TopBar";
// import Sidebar from "./components/Layout/Sidebar";
// import EquipmentClassList from "./components/EquipmentClass/EquipmentClassList";
// import PropertiesList from "./components/EquipmentClassProperties/PropertiesList";

// const { Header, Content } = Layout;

// const App = () => {
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
      
//       <Header style={{ padding: 0 }}>
//         <TopBar />
//       </Header>

//       <Layout>
//         <Sidebar />

//         <Layout>
//           <Content
//             style={{
//               padding: 24,
//               background: "#f5f5f5",
//               minHeight: "100vh",
//             }}
//           >
//             <EquipmentClassList />
//             <PropertiesList />
//           </Content>
//         </Layout>
//       </Layout>

//     </Layout>
//   );
// };

// export default App;
import { useState } from "react";
import { Layout } from "antd";
import TopBar from "./components/Layout/TopBar";
import Sidebar from "./components/Layout/Sidebar";

import EquipmentClassList from "./components/EquipmentClass/EquipmentClassList";
import PropertiesList from "./components/EquipmentClassProperties/PropertiesList";

const { Header, Content } = Layout;

const App = () => {

  const [selectedPage, setSelectedPage] = useState("equipment");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Header style={{ padding: 0, height: 88, lineHeight: "normal" }}>
        <TopBar />
      </Header>

      <Layout>

        <Sidebar
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />

        <Layout style={{ flex: 1, minWidth: 0 }}>
          <Content
            style={{
              padding: 24,
              background: "#f5f5f5",
              minHeight: "100vh",
            }}
          >

            {selectedPage === "equipment" && <EquipmentClassList />}

            {selectedPage === "properties" && <PropertiesList />}

          </Content>
        </Layout>

      </Layout>

    </Layout>
  );
};

export default App;