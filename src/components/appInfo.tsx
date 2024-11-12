"use client";

import React, { useEffect, useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

const AppInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="flex flex-col items-center">
        <DrawerHeader className="max-w-[500px]">
          <DrawerTitle>Hey there!</DrawerTitle>
          <DrawerDescription>
            This is Quan, I built this demo on Nov 11th 2024 for my front-end
            engineer application at Uber.
            <br />
            <br />
            It is built with React/Next.js, and TypeScript, with data hosted on
            Supabase. The data comes from the synthetic{" "}
            <a
              href="https://www.kaggle.com/datasets/arnavsmayan/urban-mobility-dataset"
              target="_blank"
              className="underline"
            >
              Urban Mobility Dataset
            </a>{" "}
            from Kaggle, and updates every full hour to show a new set of data.
            <br />
            <br />
            The source code is fully open source and available on{" "}
            <a
              href="https://github.com/Konsequanzheng/uber-dashboard-demo"
              target="_blank"
              className="underline"
            >
              GitHub
            </a>
            . For any questions you can reach me at{" "}
            <a href="mailto:quan.zheng2@gmail.com" className="underline">
              quan.zheng2@gmail.com
            </a>
            .
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Understood</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AppInfo;
