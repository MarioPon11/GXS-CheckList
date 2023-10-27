"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const react_1 = require("react");
const App = () => {
    const [count, setCount] = (0, react_1.useState)(0);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Hello from React!" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Count: ", count] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setCount(count + 1), children: "Increment" })] }));
};
const root = (0, client_1.createRoot)(document.body);
root.render((0, jsx_runtime_1.jsx)(App, {}));
//# sourceMappingURL=app.js.map