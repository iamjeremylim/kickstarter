import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
  onApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const { description, value, recipient, approvalCount, complete } = request;
    const readyToFinalize =
      parseInt(approvalCount) > parseInt(approversCount) / 2;

    return (
      <Row disabled={complete} positive={readyToFinalize && !!complete}>
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>
          {parseInt(approvalCount)}/{parseInt(approversCount)}
        </Cell>
        <Cell textAlign="center">
          <Button
            disabled={complete}
            color={!complete && "green"}
            basic
            onClick={this.onApprove}
          >
            {complete ? "Approved" : "Approve"}
          </Button>
        </Cell>
        <Cell textAlign="center">
          <Button
            disabled={complete}
            color={!complete && "teal"}
            basic
            onClick={this.onFinalize}
          >
            {complete ? "Finalized" : "Finalize"}
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
