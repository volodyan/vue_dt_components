// 引入mockjs
const Mock = require("mockjs");
import GeTreeData from './data/GeTreeData.json'
import AddTreeNode from './data/AddTreeNode.json'
import UpdateTreeNode from './data/UpdateTreeNode.json'
import DelTreeNode from './data/DelTreeNode.json'


// Mock.mock( url, post/get , 返回的数据)；

Mock.mock("/api/TreeNode/GeTreeData", "post", GeTreeData);
Mock.mock("/api/TreeNode/AddTreeNode", "post", AddTreeNode);
Mock.mock("/api/TreeNode/UpdateTreeNode", "post", UpdateTreeNode);
Mock.mock("/api/TreeNode/DelTreeNode", "post", DelTreeNode);