import React from "react";
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavTitle
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilBook,
  cilPeople,
  cilTags,
  cilClipboard
} from "@coreui/icons";

export const Sidebar: React.FC = () => {
  return (
    <CSidebar className="border-end" colorScheme="dark">

      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>Library System</CSidebarBrand>
      </CSidebarHeader>

      <CSidebarNav>

        <CNavTitle>Dashboard</CNavTitle>

        <CNavItem href="/">
          <CIcon className="nav-icon w-5 h-5" icon={cilSpeedometer} />
          Dashboard
        </CNavItem>

        <CNavTitle>Management</CNavTitle>

        <CNavItem href="/categories">
          <CIcon customClassName="nav-icon" icon={cilTags} />
          Categories
        </CNavItem>

        <CNavItem href="/books">
          <CIcon customClassName="nav-icon" icon={cilBook} />
          Books
        </CNavItem>

        <CNavItem href="/members">
          <CIcon customClassName="nav-icon" icon={cilPeople} />
          Members
        </CNavItem>

        <CNavItem href="/bookissue">
          <CIcon customClassName="nav-icon" icon={cilClipboard} />
          Book Issue
        </CNavItem>

      </CSidebarNav>

    </CSidebar>
  );
};