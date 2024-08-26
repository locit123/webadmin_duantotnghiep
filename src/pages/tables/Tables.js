import React from "react";
import "./Tables.scss";
import FormTable from "../../components/form/formTables/FormTable";
import TableTable from "../../components/tables/tableTables/TableTable";
import { useDispatch, useSelector } from "react-redux";
import { getStatusState, getThemeState } from "../../store/selector";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { valueFormTable } from "../../store/valueForm/tables/actions";
import { typeActionSetStatus } from "../../store/tables/setStatus/actions";
function Tables(props) {
  console.log("render tables");
  const theme = useSelector(getThemeState);
  const status = useSelector(getStatusState);

  const dispatch = useDispatch();
  const handleSelect = (key) => {
    if (key === "Bàn") {
      dispatch(typeActionSetStatus.setStatusTable(["create"]));
      dispatch(valueFormTable.setTableNumber(""));
    }
  };
  return (
    <div className={`layout-table ${theme ? "theme" : ""}`}>
      <Tabs
        defaultActiveKey="Bàn"
        id="uncontrolled-tab-example"
        className="mb-3 mx-3"
        onSelect={handleSelect}
      >
        <Tab eventKey="Bàn" title="Bàn">
          <TableTable />
        </Tab>
        <Tab
          eventKey="Tạo Bàn"
          title={status[0] === "update" ? "Cập nhật bàn" : "Tạo Bàn"}
        >
          <FormTable />
        </Tab>
      </Tabs>
    </div>
  );
}

export default React.memo(Tables);
