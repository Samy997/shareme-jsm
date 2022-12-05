import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { Routes, Route, Link } from "react-router-dom";
import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        {user ? (
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            user={user}
          />
        ) : (
          <div className="text-end mt-2">
            <Link
              to="/login"
              className="inline-block bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
            >
              <AiOutlineLogin color="red" fontSize={21} />
            </Link>
          </div>
        )}
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
