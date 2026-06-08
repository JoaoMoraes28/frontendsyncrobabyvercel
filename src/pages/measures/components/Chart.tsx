import Date from "../../../utils/Date.ts"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type { Height } from "../../../services/measures/measures.service"
import type { Weight } from "../../../services/measures/measures.service"
import type { Bmi } from "../../../services/measures/measures.service"
import type { Head } from "../../../services/measures/measures.service"

interface Props {
    data: (Height | Head | Weight | Bmi)[]
    value_type: string
}

function Chart({ data, value_type }: Props) {
    function formatedData(data: (Height | Head | Weight | Bmi)[]) {
        const newChartData: (Height | Head | Weight | Bmi)[] = data.map((it) => {
            return {...it, update_date: Date.formatedDate(it.update_date.split("T")[0])}
        })

        return newChartData
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatedData(data)}
                margin={{ left: -40, right: 5, top: 0, bottom: 0 }}
                className="bg-lilas-bg py-2 shadow-purple-md">
                <CartesianGrid stroke="#9d87d2" strokeDasharray="3 3" />
                <XAxis dataKey="update_date"
                    tick={{ fill: "#41354c", fontSize: 12 }}
                    axisLine={{ stroke: "#000000" }}
                    tickLine={false}
                    padding={{left: 0, right: 0}} />
                <YAxis
                    tick={{ fill: "#41354c", fontSize: 12 }}
                    axisLine={{ stroke: "#000000" }}
                    tickLine={false} />
                <Tooltip contentStyle={{
                    backgroundColor: "#f3e8ff",
                    borderRadius: 8,
                    border: "1px solid #9334ea",
                }}
                    labelStyle={{ fontWeight: "bold", color: "#41354c" }} />
                <Bar fill="#8c76bd" dataKey={value_type} barSize={70} stroke="#722cb2" strokeWidth={2} />
            </BarChart>
        </ResponsiveContainer>
    )

}

export default Chart