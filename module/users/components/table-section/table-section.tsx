"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface tableType {
  id: number;
  name: string;
  email: string;
  status: string;
  designation: string;
  role: string;
  company: string;
  joinedAt: string;
}

const TableSection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [mockData, setMockData] = useState<tableType[]>([]);
  const router = useRouter();
  useEffect(() => {
    // Generate data only on client-side
    const createMockData = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Employee ${i + 1}`,
        email: `Employee${i + 1}@gmail.com`,
        status: i % 4 === 0 ? "Inactive" : "Active",
        designation: `Designation ${i + 1}`,
        role: "1",
        company: `Company ${i + 1}`,
        joinedAt: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      }));
    };

    setMockData(createMockData(35));
  }, []);

  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newPerPage);
    setCurrentPage(1);
  };
  return (
    <div className="border overflow-auto m-[20px]  rounded-[8px] bg-[var(--background-second)] flex flex-col p-6 gap-4">
      <div className=" rounded-lg overflow-hidden">
        <Table className="bg-[var(--background)] rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="border text-start text-[16px] font-[600] px-[20px] h-[50px]">
                Name
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                Email
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                Status
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                Designation
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                Company
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                Role
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow
                onClick={() => router.push(`/users/${item.id}`)}
                key={item.id}
              >
                <TableCell className="border text-[14px] font-[500] border-[var(--border)] text-start px-[20px]">
                  {item.name}
                </TableCell>
                <TableCell className="border text-[14px] font-[500] border-[var(--border)] text-start px-[20px]">
                  {item.email}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-[14px] font-[500] text-start px-[20px]">
                  <span
                    className={` text-[14px] font-[500] ${
                      item.status === "Active"
                        ? " text-green-800"
                        : " text-rose-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="border text-[14px] font-[500] border-[var(--border)] text-start px-[20px]">
                  {item.designation}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-[14px] font-[500] text-start px-[20px]">
                  {item.company}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-[14px] font-[500] text-start px-[20px]">
                  {item.role}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-start px-[20px] text-[14px] font-[500]">
                  {item.joinedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableCaption className="text-left flex">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, mockData.length)} of{" "}
          {mockData.length} companies
        </TableCaption>
        <div className="flex flex-col sm:flex-row mt-2 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--muted-foreground)]">
              Rows per page:
            </span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border border-[var(--border)] rounded px-2 py-1 text-sm bg-transparent"
            >
              {[15, 30, 50].map((size) => (
                <option
                  className="bg-[var(--background)]"
                  key={size}
                  value={size}
                >
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border border-[var(--border)] text-sm ${
                currentPage === 1
                  ? "text-[var(--muted-foreground)] cursor-not-allowed"
                  : "hover:bg-[var(--muted)]"
              }`}
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded text-sm ${
                      currentPage === page
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "hover:bg-[var(--muted)]"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border border-[var(--border)] text-sm ${
                currentPage === totalPages
                  ? "text-[var(--muted-foreground)] cursor-not-allowed"
                  : "hover:bg-[var(--muted)]"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSection;
