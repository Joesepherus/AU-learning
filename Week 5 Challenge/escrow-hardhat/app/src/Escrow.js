export default function Escrow({
  address,
  beneficiary,
  value,
  handleApprove,
  handleSendGoods
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleSendGoods();
          }}
        >
          Send Goods
        </div>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          Approve
        </div>
      </ul>
    </div>
  );
}
