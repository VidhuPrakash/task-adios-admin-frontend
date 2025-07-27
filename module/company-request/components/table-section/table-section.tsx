"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Command, CommandInput } from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  fetchCompanyRequests,
  useFetchCompanyRequestsMutation,
} from "../../services/query/list-request-action";
import { FetchError } from "@/helper/error";

interface tableType {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
  website: string;
  requestedAt: string;
  country: string;
  address: string;
  total: number;
}

const TableSection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [mockData, setMockData] = useState<tableType[]>([]);
  const router = useRouter();
  const [position, setPosition] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const { mutate, isPending } = useFetchCompanyRequestsMutation(setMockData);
  const totalPages = Math.ceil(mockData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = mockData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    mutate({
      keyword,
      page: currentPage,
      limit: itemsPerPage,
      pageSize: itemsPerPage,
    });
  }, [keyword, currentPage, itemsPerPage, position]);

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
  const handleKeywordChange = (event: FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement;
    setKeyword(target.value);
  };

  return (
    <Card className="border overflow-auto  rounded-[8px] bg-card flex flex-col p-6 gap-4">
      <div className="flex gap-5">
        <Command
          onChange={handleKeywordChange}
          className="w-[300px] bg-[var(--background)]"
        >
          <CommandInput placeholder="Search..." />
        </Command>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="plain">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem className="text-green-800" value="active">
                Active
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="text-rose-800" value="inactive">
                Inactive
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem className="" value="">
                Clear
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-lg overflow-hidden">
        <Table className="bg-card rounded-lg">
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
                No.employees
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                No.projects
              </TableHead>
              <TableHead className="border text-start px-[20px] h-[50px] text-[16px] font-[600]">
                Joined At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow
                onClick={() => router.push(`/companies/${item.id}`)}
                key={item.id}
              >
                <TableCell className="border text-[14px] font-[500] border-[var(--border)] text-start px-[20px]">
                  {item.name}
                </TableCell>
                <TableCell className="border text-[14px] font-[500] border-[var(--border)] text-start px-[20px]">
                  {item.email}
                </TableCell>
                <TableCell className="border text-[14px] font-[500] border-[var(--border)] text-start px-[20px]">
                  {item.phoneNumber}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-[14px] font-[500] text-start px-[20px]">
                  {item.description}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-start px-[20px] text-[14px] font-[500]">
                  {item.requestedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="text-[12px] text-left flex  p-2">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, mockData.length)} of{" "}
          {mockData.length} companies
        </div>
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
    </Card>
  );
};

export default TableSection;
