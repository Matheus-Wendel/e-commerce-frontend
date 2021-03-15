import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
export default class SSTable extends Component {
  render() {
    const paginationOption = {
      custom: true,
      sizePerPage: 10,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
      alwaysShowAllBtns: true,
      totalSize: this.props.data.length,
    };
    const SStable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <BootstrapTable
          wrapperClasses="table-responsive"
          hover
          bootstrap4={true}
          noDataIndication={this.props.noDataIndication || "Sem resultados."}
          keyField="id"
          data={this.props?.data || []}
          columns={this.props?.columns}
          {...paginationTableProps}
        />
        <div className="col d-flex justify-content-center">
          <PaginationListStandalone {...paginationProps} />
        </div>
      </div>
    );
    return (
      <div>
        <PaginationProvider pagination={paginationFactory(paginationOption)}>
          {SStable}
        </PaginationProvider>
      </div>
    );
  }
}
