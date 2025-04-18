import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const sampleData = [
  {
    title: "다이소 꿀템 추천 BEST 10!",
    views: 1200000,
    subscribers: 15000,
    type: "shorts",
    date: "2024-03-25",
  },
  {
    title: "다이소 신제품 털어보기 (롱폼)",
    views: 980000,
    subscribers: 50000,
    type: "longform",
    date: "2024-03-27",
  },
  {
    title: "다이소 인생템 솔직리뷰",
    views: 670000,
    subscribers: 8000,
    type: "shorts",
    date: "2024-03-28",
  },
];

export default function YouTubeAnalyzer() {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("views");
  const [videoType, setVideoType] = useState("all");

  const filteredData = sampleData
    .filter((video) => {
      if (videoType === "all") return true;
      return video.type === videoType;
    })
    .sort((a, b) => {
      if (filter === "views") {
        return b.views / b.subscribers - a.views / a.subscribers;
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📈 유튜브 인사이트 검색</h1>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="예: 다이소"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="views">조회수순</TabsTrigger>
            <TabsTrigger value="latest">최신순</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs value={videoType} onValueChange={setVideoType}>
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="shorts">쇼츠</TabsTrigger>
            <TabsTrigger value="longform">롱폼</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4">
        {filteredData.map((video, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="font-semibold text-lg">{video.title}</div>
                <div className="text-sm text-gray-500">
                  조회수: {video.views.toLocaleString()} / 구독자: {video.subscribers.toLocaleString()} → 비율: {(
                    video.views / video.subscribers
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-gray-400">업로드일: {video.date}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}