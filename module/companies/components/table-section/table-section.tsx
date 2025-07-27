"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Command, CommandInput } from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  TableType,
  useFetchCompanyRequestsMutation,
} from "../../service/mutation/list-company-action";

interface tableType {
  id: number;
  name: string;
  email: string;
  status: string;
  employees: number;
  projects: number;
  joinedAt: string;
}

const TableSection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);
  const [companies, setCompanies] = useState<TableType[]>([]);
  const router = useRouter();
  const [position, setPosition] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const mutation = useFetchCompanyRequestsMutation((data) => {
    setCompanies(data);
    setTotal(data.length);
  });

  useEffect(() => {
    // Compose keyword from search/status
    let keyword = search;
    if (status) keyword = keyword ? `${keyword} ${status}` : status;

    mutation.mutate({
      keyword,
      page: currentPage,
      limit: itemsPerPage,
      pageSize: itemsPerPage,
    });
  }, [currentPage, itemsPerPage, search, status]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const currentItems = companies;

  return (
    <Card className="border overflow-auto  rounded-[8px] bg-card flex flex-col p-6 gap-4">
      <div className="flex gap-5">
        <Command className="w-[300px] bg-[var(--background)]">
          <CommandInput placeholder="Search..." />
        </Command>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="plain">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={(v) => {
                setStatus(v);
                setCurrentPage(1);
              }}
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
                  {item.employees ?? 0}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-[14px] font-[500] text-start px-[20px]">
                  {item.projects ?? 0}
                </TableCell>
                <TableCell className="border border-[var(--border)] text-start px-[20px] text-[14px] font-[500]">
                  {item.requestedAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="text-[12px] text-left flex  p-2">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, total)} of {total} companies
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
