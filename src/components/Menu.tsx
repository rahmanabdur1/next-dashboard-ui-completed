"use client"

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Customer",
        visible: ["admin"],
        subItems: [
          {
            label: "New Customer",
            href: "/customer/new",
            visible: ["admin"],
          },
          {
            label: "All Customers",
            href: "/customer/all",
            visible: ["admin"],
          },
        ],
      },


      {
        icon: "/teacher.png",
        label: "Supplier",
        visible: ["admin"],
        subItems: [
          {
            label: "New Suppiler",
            href: "/supplier/new",
            visible: ["admin"],
          },
          {
            label: "All Suppiler",
            href: "/supplier/all",
            visible: ["admin"],
          },
        ],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
     
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/sign-in",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];
const Menu = () => {
  const [expanded, setExpanded] = useState(null); // Track which menu is expanded

  const handleToggle = (index:any) => {
    setExpanded(expanded === index ? null : index); // Toggle expansion
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section, sectionIndex) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item, itemIndex) => {
            const isExpanded = expanded === `${sectionIndex}-${itemIndex}`;

            if (item.visible.includes(role)) {
              return (
                <div key={item.label} className="flex flex-col">
                  <div
                    onClick={() =>
                      item.subItems ? handleToggle(`${sectionIndex}-${itemIndex}`) : null
                    }
                    className="flex items-center justify-between lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <Image src={item.icon} alt="" width={20} height={20} />
                      <span className="hidden lg:block">{item.label}</span>
                    </div>
                    {item.subItems && (
                      <span
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ▼
                      </span>
                    )}
                  </div>
                  {item.subItems && (
                    <div
                      className={`overflow-hidden transition-all duration-300 transform ${
                        isExpanded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                      }`}
                      style={{ maxHeight: isExpanded ? "100px" : "0px" }} // Adjust height dynamically
                    >
                      {item.subItems.map(
                        (subItem) =>
                          subItem.visible.includes(role) && (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="flex items-center gap-4 text-gray-400 py-1 md:px-4 rounded-md hover:bg-gray-200"
                            >
                              {subItem.label}
                            </Link>
                          )
                      )}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;