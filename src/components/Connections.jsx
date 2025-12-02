import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "../utils/connectionsSlice";
import ConnectionCard from "./ConnectionCard";
import { URL } from "../Constants";
import { useSearchParams } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections?.data);

  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params (fallbacks)
  const urlPage  = parseInt(searchParams.get("page"))  || 1;
  const urlLimit = parseInt(searchParams.get("limit")) || 5;

  // Initialize state from URL params
  const [page, setPage] = useState(urlPage);
  const [limit, setLimit] = useState(urlLimit);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Keep URL in sync when page or limit change (state -> URL)
  useEffect(() => {
    const sPage  = String(page);
    const sLimit = String(limit);
    
    // only update if different to avoid unnecessary history changes
    if (searchParams.get("page") !== sPage || searchParams.get("limit") !== sLimit) {
      setSearchParams({ page: sPage, limit: sLimit });
    }
    
  }, [page, limit]); // intentionally not including setSearchParams/searchParams to keep it simple

  // Keep state in sync when URL changes externally (URL -> state)
  useEffect(() => {
    const sp = parseInt(searchParams.get("page")) || 1;
    const sl = parseInt(searchParams.get("limit")) || 5;
    if (sp !== page) setPage(sp);
    if (sl !== limit) setLimit(sl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch connections for current page & limit
  useEffect(() => {
    let mounted = true;
    const handleConnections = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${URL}user/connections?page=${page}&limit=${limit}`, {
          withCredentials: true,
        });

        // dispatch response (ensure reducer picks the right data path)
        dispatch(setConnections(res.data));

        if (mounted) {
          if (res.data?.totalPages) setTotalPages(res.data.totalPages);
          else if (res.data?.total) setTotalPages(Math.max(Math.ceil(res.data.total / limit), 1));
          else setTotalPages(1);
        }
      } catch (err) {
        console.log("Error while fetching connections", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    handleConnections();
    return () => {
      mounted = false;
    };
  }, [dispatch, page, limit]);

  // Guards
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading connections...</p>
      </div>
    );
  }

  if (!connectionsData) return null;

  if (connectionsData.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">No Connections Found</h1>
      </div>
    );

  // Pagination handlers
  const onPrev = () => setPage((p) => Math.max(p - 1, 1));
  const onNext = () => setPage((p) => (p < totalPages ? p + 1 : p));
  const goToPage = (p) => setPage(Math.max(1, Math.min(p, totalPages)));

  // Render numbered buttons
  const renderPageButtons = () => {
    const pages = [];
    const maxButtons = 3;
    let start = 1;
    let end = maxButtons;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxButtons + 1);
    }
    
    for (let p = start; p <= end; p++) {
      pages.push(
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-1 rounded-md mx-1 ${
            p === page ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          {p}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="w-full py-6 bg-gradient-to-r from-indigo-600 via-rose-500 to-yellow-400 shadow-md">
        <h1 className="text-3xl text-white font-bold text-center tracking-wide">Connections</h1>
        <p className="text-center text-white/80 text-sm mt-1">People you are connected with</p>
      </div>

      <main className="flex-1 w-full flex justify-center py-8 px-4">
        <div className="w-full max-w-3xl space-y-4">
          {connectionsData.map((entry) => (
            <ConnectionCard key={entry.connectionId ?? entry._id ?? entry.id} connectionData={entry} />
          ))}

          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              onClick={onPrev}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white"}`}
            >
              Prev
            </button>

            <div className="flex items-center">{renderPageButtons()}</div>

            <button
              onClick={onNext}
              disabled={page >= totalPages}
              className={`px-4 py-2 rounded-md ${page >= totalPages ? "bg-gray-200 text-gray-400" : "bg-indigo-600 text-white"}`}
            >
              Next
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-2">Page {page} of {totalPages}</div>
        </div>
      </main>
    </div>
  );
};

export default Connections;
