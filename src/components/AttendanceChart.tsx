import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { week: 'Week 1', attendance: 92, average: 88 },
  { week: 'Week 2', attendance: 88, average: 88 },
  { week: 'Week 3', attendance: 95, average: 89 },
  { week: 'Week 4', attendance: 85, average: 87 },
  { week: 'Week 5', attendance: 89, average: 88 },
  { week: 'Week 6', attendance: 94, average: 89 },
  { week: 'Week 7', attendance: 91, average: 88 },
  { week: 'Week 8', attendance: 87, average: 88 },
];

export const AttendanceChart = () => {
  return (
    <Card className="col-span-2 card-hover">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">Attendance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="week" 
                tick={{ fill: '#403E43' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                domain={[80, 100]} 
                tick={{ fill: '#403E43' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ fill: '#0EA5E9', strokeWidth: 2 }}
                name="Class Attendance"
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#33C3F0"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Department Average"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};