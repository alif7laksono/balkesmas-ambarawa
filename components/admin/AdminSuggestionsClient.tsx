// components/admin/AdminSuggestionsClient.tsx

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Suggestion = {
  _id: string;
  name: string;
  phone: string;
  message: string;
  status?: string;
  createdAt: string;
};

export default function AdminSuggestionsClient() {
  const [data, setData] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [suggestionToDelete, setSuggestionToDelete] =
    useState<Suggestion | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchData = useCallback(
    async (p = page) => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        qs.set("page", String(p));
        qs.set("limit", String(limit));
        if (search) qs.set("search", search);
        if (startDate) qs.set("startDate", startDate);
        if (endDate) qs.set("endDate", endDate);

        const res = await fetch(`/api/suggestions?${qs.toString()}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
          setTotalPages(json.meta?.totalPages ?? 1);
          setPage(json.meta?.page ?? p);
        } else {
          toast("Gagal mengambil data");
        }
      } catch (err) {
        toast("Terjadi kesalahan saat mengambil data");
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [page, limit, search, startDate, endDate]
  );

  // initial & whenever filters change
  useEffect(() => {
    fetchData(1);
  }, [fetchData, search, startDate, endDate]);

  const markRead = async (id: string) => {
    try {
      const res = await fetch("/api/suggestions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "read" }),
      });
      const j = await res.json();
      if (j.success) {
        toast("Ditandai dibaca");
        fetchData();
      }
    } catch {
      toast("Gagal menandai");
    }
  };

  const remove = async (suggestion: Suggestion) => {
    try {
      const res = await fetch(`/api/suggestions?id=${suggestion._id}`, {
        method: "DELETE",
      });
      const j = await res.json();

      if (j.success) {
        toast.success("Data berhasil dihapus", {
          description: `Saran dari "${suggestion.name}" telah dihapus`,
          action: {
            label: "Batalkan",
            onClick: () => undoDelete(suggestion),
          },
        });
        fetchData();
      } else {
        toast.error("Gagal menghapus data", {
          description: "Terjadi kesalahan saat menghapus data",
        });
      }
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      toast.error("Gagal menghapus data", {
        description: "Terjadi kesalahan jaringan",
      });
    }
  };

  const undoDelete = async (suggestion: Suggestion) => {
    try {
      toast.info("Membatalkan penghapusan...");
      await fetch(`/api/suggestions/restore?id=${suggestion._id}`, {
        method: "POST",
      });
      fetchData();
    } catch (error) {
      toast.error("Gagal membatalkan penghapusan");
      console.log(error);
    }
  };

  const confirmDelete = (suggestion: Suggestion) => {
    setSuggestionToDelete(suggestion);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = () => {
    if (suggestionToDelete) {
      remove(suggestionToDelete);
      setIsDeleteDialogOpen(false);
      setSuggestionToDelete(null);
    }
  };

  const openMessageDialog = (message: string) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const formatMessage = (message: string) => {
    return message.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Saran & Masukan</CardTitle>
          <CardDescription>
            Filter data berdasarkan kriteria tertentu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, telepon, atau pesan..."
              className="border p-2 rounded flex-1"
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <Button
              onClick={() => {
                setSearch("");
                setStartDate("");
                setEndDate("");
                fetchData(1);
              }}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Saran & Masukan</CardTitle>
          <CardDescription>
            Total {data.length} data ditemukan (Halaman {page} dari {totalPages}
            )
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left text-sm font-medium w-[15%]">
                    Nama
                  </th>
                  <th className="p-3 text-left text-sm font-medium w-[15%]">
                    Telepon
                  </th>
                  <th className="p-3 text-left text-sm font-medium w-[40%]">
                    Pesan
                  </th>
                  <th className="p-3 text-left text-sm font-medium w-[15%]">
                    Tanggal
                  </th>
                  <th className="p-3 text-left text-sm font-medium w-[10%]">
                    Status
                  </th>
                  <th className="p-3 text-left text-sm font-medium w-[15%]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-4 text-center text-muted-foreground"
                    >
                      Tidak ada data yang ditemukan
                    </td>
                  </tr>
                ) : (
                  data.map((row) => (
                    <tr key={row._id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium truncate" title={row.name}>
                        {row.name}
                      </td>
                      <td
                        className="p-3 font-mono text-sm truncate"
                        title={row.phone}
                      >
                        {row.phone}
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          className="text-left h-auto p-0 hover:bg-transparent w-full justify-start"
                          onClick={() => openMessageDialog(row.message)}
                        >
                          <span className="line-clamp-2 text-foreground text-sm break-words whitespace-normal">
                            {truncateMessage(row.message, 80)}
                          </span>
                        </Button>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(row.createdAt).toLocaleDateString("id-ID")}
                        <br />
                        <span className="text-xs">
                          {new Date(row.createdAt).toLocaleTimeString("id-ID")}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            row.status === "read" ? "default" : "secondary"
                          }
                          className="whitespace-nowrap"
                        >
                          {row.status || "unread"}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            onClick={() => markRead(row._id)}
                            variant={
                              row.status === "read" ? "outline" : "default"
                            }
                            disabled={row.status === "read"}
                            className="whitespace-nowrap"
                          >
                            {row.status === "read" ? "✓ Dibaca" : "Tandai"}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => confirmDelete(row)}
                            variant="destructive"
                            className="whitespace-nowrap"
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - tetap sama */}
        </CardContent>
      </Card>

      {/* Message Dialog - tetap sama */}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive">
              Konfirmasi Hapus
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Apakah Anda yakin ingin menghapus saran ini?</p>

            {suggestionToDelete && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div>
                      <strong>Nama:</strong> {suggestionToDelete.name}
                    </div>
                    <div>
                      <strong>Telepon:</strong> {suggestionToDelete.phone}
                    </div>
                    <div>
                      <strong>Pesan:</strong>
                      <div className="mt-1 text-sm text-muted-foreground line-clamp-3">
                        {truncateMessage(suggestionToDelete.message, 150)}
                      </div>
                    </div>
                    <div>
                      <strong>Tanggal:</strong>{" "}
                      {new Date(
                        suggestionToDelete.createdAt
                      ).toLocaleDateString("id-ID")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <p className="text-sm text-muted-foreground">
              Tindakan ini tidak dapat dibatalkan setelah dihapus.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={executeDelete}>
              Ya, Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Detail Pesan Lengkap</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="whitespace-pre-wrap break-words p-4 bg-gray-50 rounded-lg">
              {formatMessage(selectedMessage)}
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button onClick={() => setIsDialogOpen(false)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
