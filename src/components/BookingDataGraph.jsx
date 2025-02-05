import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

function BookingDataGraph({ data }) {
  return (
    <BarChart height={400} width={600} data={data}>
      <XAxis dataKey="model" stroke="#0369a1" />
      <YAxis dataKey="totalCost" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray={5.5} />
      <Bar fill="#0369a1" barSize={30} dataKey="totalCost" />
    </BarChart>
  );
}

export default BookingDataGraph;
