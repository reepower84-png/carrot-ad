"use client";

import { useState, useEffect } from "react";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inquiries", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries);
        setIsAuthenticated(true);
        sessionStorage.setItem("adminPassword", password);
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    const storedPassword = sessionStorage.getItem("adminPassword");
    if (!storedPassword) return;

    try {
      const response = await fetch("/api/inquiries", {
        headers: {
          Authorization: `Bearer ${storedPassword}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 문의를 삭제하시겠습니까?")) return;

    const storedPassword = sessionStorage.getItem("adminPassword");
    if (!storedPassword) return;

    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedPassword}`,
        },
      });

      if (response.ok) {
        setInquiries(inquiries.filter((inq) => inq.id !== id));
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminPassword");
    setIsAuthenticated(false);
    setPassword("");
    setInquiries([]);
  };

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("adminPassword");
    if (storedPassword) {
      setPassword(storedPassword);
      setIsAuthenticated(true);
      fetchInquiries();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-600">당근마켓광고 어드민</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6f0f] focus:border-transparent outline-none transition"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#ff6f0f]">당근마켓광고 관리자</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 transition"
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              문의 목록 ({inquiries.length}건)
            </h2>
            <button
              onClick={fetchInquiries}
              className="text-sm text-[#ff6f0f] hover:text-[#e5630d] transition"
            >
              새로고침
            </button>
          </div>

          {inquiries.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              접수된 문의가 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      접수일시
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      전화번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상담 문의
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(inquiry.created_at).toLocaleString("ko-KR", {
                          timeZone: "Asia/Seoul",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-[#ff6f0f] hover:underline"
                        >
                          {inquiry.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {inquiry.message || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-red-600 hover:text-red-900 transition"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
