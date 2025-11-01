import { useState } from "react";
import { Table, Input, Select, Button, Space, Avatar, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdFilterList, MdAdd } from "react-icons/md";
import { useTheme } from "../../../contexts/ThemeContext";
import employeesData from "../../../data/employeesData.json";
import "./EmployeeList.scss";

const { Option } = Select;
const { Search } = Input;

const EmployeeList = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // Use data from JSON file
  const employees = employeesData;

  const columns = [
    {
      title: "Employee",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="employee-list__employee-cell">
          <Avatar src={record.avatar} size={40} />
          <div className="employee-list__employee-info">
            <div className="employee-list__employee-name">{text}</div>
            <div className="employee-list__employee-email">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color={theme.colors.primary} style={{ borderRadius: "4px" }}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag
          color={text === "Active" ? theme.colors.success : theme.colors.error}
          style={{ borderRadius: "4px" }}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="employee-list">
      <div className="employee-list__header">
        <div className="employee-list__search-filters">
          <Search
            placeholder="Search employees..."
            allowClear
            enterButton={<MdSearch />}
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Filter by Department"
            style={{ width: 200 }}
            size="large"
            allowClear
          >
            <Option value="Engineering">Engineering</Option>
            <Option value="Product">Product</Option>
            <Option value="Design">Design</Option>
            <Option value="Human Resources">Human Resources</Option>
            <Option value="Marketing">Marketing</Option>
            <Option value="Business">Business</Option>
          </Select>
          <Select
            placeholder="Filter by Status"
            style={{ width: 150 }}
            size="large"
            allowClear
          >
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
          <Button icon={<MdFilterList />} size="large">
            More Filters
          </Button>
        </div>
        <Button
          type="primary"
          icon={<MdAdd />}
          size="large"
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          }}
        >
          Add Employee
        </Button>
      </div>

      <div className="employee-list__table">
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} employees`,
          }}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/employee/${record.id}`);
            },
            style: { cursor: "pointer" },
          })}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
