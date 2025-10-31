import { useState } from 'react';
import { Table, Button, Space, Dropdown, Select } from 'antd';
import { MdStar, MdStarBorder, MdMoreVert, MdAdd, MdFileDownload, MdVisibility, MdFilterList, MdSort } from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';
import './CheckboxTable.scss';

const CheckboxTable = ({
  columns,
  dataSource,
  onSelectionChange,
  enableDisableRowIds = [], // Array of row IDs that should have disabled checkboxes
  rowKey = 'id',
  headerActions,
  showStar = true,
  renderCustomCell,
  onRowClick,
}) => {
  const { theme } = useTheme();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectionChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
    if (onSelectionChange) {
      onSelectionChange(selectedKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectionChange,
    getCheckboxProps: (record) => ({
      disabled: enableDisableRowIds.includes(record[rowKey]),
    }),
  };

  // Add star column if enabled
  const starColumn = showStar
    ? {
        title: '',
        key: 'star',
        width: 60,
        render: (_, record) => (
          <button
            className="checkbox-table__star-btn"
            onClick={() => {
              // Toggle favorite logic can be added here
              console.log('Toggle favorite', record[rowKey]);
            }}
          >
            {record.favorite ? (
              <MdStar className="checkbox-table__star checkbox-table__star--filled" />
            ) : (
              <MdStarBorder className="checkbox-table__star" />
            )}
          </button>
        ),
      }
    : null;

  // Prepare columns with star column if needed
  const tableColumns = starColumn ? [starColumn, ...columns] : columns;

  return (
    <div className="checkbox-table">
      {headerActions && (
        <div className="checkbox-table__header">
          <div className="checkbox-table__header-left">
            {headerActions.left}
          </div>
          <div className="checkbox-table__header-right">
            {headerActions.right}
          </div>
        </div>
      )}
      <div className="checkbox-table__table-wrapper">
        <Table
          rowSelection={rowSelection}
          columns={tableColumns}
          dataSource={dataSource}
          rowKey={rowKey}
          pagination={false}
          className="checkbox-table__table"
          onRow={(record) => ({
            onClick: (e) => {
              // Don't trigger row click if clicking on checkbox or star
              if (e.target.closest('.ant-checkbox-wrapper') || e.target.closest('.checkbox-table__star-btn')) {
                return;
              }
              if (onRowClick) {
                onRowClick(record);
              }
            },
            style: { cursor: onRowClick ? 'pointer' : 'default' },
          })}
        />
      </div>
    </div>
  );
};

export default CheckboxTable;

