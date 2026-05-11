import { useEffect } from "react";

import Date from "../../../utils/Date"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: DataChart[]
}

export interface DataChart {
    month: string
    month_index: number
    records: MonthData[]
}

interface MonthData {
    date: string
    value: number
}

interface ChartValues {
    name: string
    valor: number
}

function Chart({ data }: Props) {
    function formatedData(data: DataChart[]) {
        const newDataChart: ChartValues[][] = data.map((it) => {
            const values: ChartValues[] = it.records.map((value) => {
                return { name: `${Date.formatedDate(value.date)}`, valor: value.value }
            })
            return values
        })

        return [...newDataChart[0], ...newDataChart[1]]
    }

    useEffect(() => {
        console.log(formatedData(data))
    }, [])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formatedData(data)}
                margin={{ left: -40, right: 5, top: 0, bottom: 0 }}
                className="bg-lilas-bg py-2 shadow-purple-md">
                <CartesianGrid stroke="#9d87d2" strokeDasharray="3 3" />
                <XAxis dataKey="name"
                    tick={{ fill: "#41354c", fontSize: 12 }}
                    axisLine={{ stroke: "#000000" }}
                    tickLine={false} />
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
                <Line activeDot={{ r: 7 }} type="monotone" dataKey="valor" stroke="#722cb2" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    )

}

export default Chart