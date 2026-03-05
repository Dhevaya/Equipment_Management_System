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
// //         <Layout style={{ padding: "24px" }}>
// //           <Content
// //             style={{
// //               background: "#fff",
// //               padding: 24,
// //               margin: 0,
// //               minHeight: 280,
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

// const { Content } = Layout;

// const App = () => {
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <TopBar />

//       <Layout>
//         <Sidebar />

//         <Layout style={{ flex: 1 }}>
//           <Content
//             style={{
//               padding: "24px",
//               background: "#f5f5f5",
//               minHeight: "100%",
//             }}
//           >
//             <EquipmentClassList />
//           </Content>
//         </Layout>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;

import { Layout } from "antd";
import TopBar from "./components/Layout/TopBar";
import Sidebar from "./components/Layout/Sidebar";
import EquipmentClassList from "./components/EquipmentClass/EquipmentClassList";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Header style={{ padding: 0 }}>
        <TopBar />
      </Header>

      <Layout>
        <Sidebar />

        <Layout>
          <Content
            style={{
              padding: 24,
              background: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <EquipmentClassList />
          </Content>
        </Layout>
      </Layout>

    </Layout>
  );
};

export default App;
