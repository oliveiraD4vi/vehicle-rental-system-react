import { useNavigate } from "react-router-dom";
import {
  ConfigProvider,
  Empty,
  Table as TableComponent,
  Pagination,
  Input,
  Button,
} from "antd";

import "./table.css";
import { PlusOutlined } from "@ant-design/icons";

const Table = ({
  getDataList,
  dataList,
  disabledPagination,
  pagination,
  setPagination,
  loading,
  setLoading,
  columns,
  goPath,
  searchPlaceholder,
}) => {
  const customizeRenderEmpty = () => (
    <Empty description={<span>No data available</span>} />
  );

  const { Search } = Input;
  const navigate = useNavigate();

  const selectRow = (record) => {
    navigate(goPath, {
      state: {
        data: record,
      },
    });
  };

  const handleTableChange = () => {
    getDataList();
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      const { page, size } = pagination;
      setLoading(true);
      getDataList(page, size, value.toLowerCase());
    }
  };

  const onChangeSearchValue = (e) => {
    if (!e.target.value.trim()) {
      const { page, size } = pagination;
      setLoading(true);
      getDataList(page, size, null);
    }
  };

  const onChangePagination = (page, size) => {
    const { search } = pagination;
    getDataList(page, size, search);
    setPagination({ ...pagination, page, size });
  };

  return (
    <div className="table-container">
      <div className="filter search-container">
        <Search
          className="search-input"
          placeholder={searchPlaceholder}
          onSearch={(value) => handleSearch(value)}
          onChange={(e) => onChangeSearchValue(e)}
          disabled={loading}
        />

        <Button
          type="primary"
          className="add-button"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => navigate(goPath)}
        />
      </div>
      <div className="table-box">
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
          <TableComponent
            className="table"
            dataSource={dataList}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
            loading={loading}
            onChange={handleTableChange}
            onRow={(record) => ({
              onClick: () => selectRow(record),
            })}
          />
        </ConfigProvider>

        {dataList && (
          <Pagination
            locale={{ items_per_page: ` /  página` }}
            showSizeChanger
            current={pagination.page}
            defaultPageSize={pagination.size}
            total={pagination.totalCount}
            onChange={onChangePagination}
            disabled={disabledPagination}
            pageSizeOptions={["5", "10", "20", "30"]}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
