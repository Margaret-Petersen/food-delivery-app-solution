"use client"
import CustomDialog from "@/lib/ui/useable-components/custom-dialog"
import CustomButton from "@/lib/ui/useable-components/button"
import { LaptopSvg } from "@/lib/utils/assets/svg"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { IDeleteAccountDialogProps } from "@/lib/utils/interfaces"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"




export default function DeleteAccountDialog({
  visible,
  onHide,
  onConfirm,
  userName = "Faizan",
  deleteReason,
  setDeleteReason,
  loading = false,
}: IDeleteAccountDialogProps) {
  const [screenWidth, setScreenWidth] = useState(1024); // Default to desktop size

  const t = useTranslations()
  const reasonOptions = [
    { label: t('delete_account_reason_not_useful'), value: "not_useful" },
    { label: t('delete_account_reason_too_expensive'), value: "too_expensive" },
    { label: t('delete_account_reason_found_alternative'), value: "found_alternative" },
    { label: t('delete_account_reason_temporary'), value: "temporary" },
    { label: t('delete_account_reason_other'), value: "other" },
  ]

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
   
  return (
    <CustomDialog visible={visible} onHide={onHide} width="600px" className="delete-account-dialog md:h-[710px]">
      <div className="p-6 flex flex-col items-center">
        {/* Illustration */}
        <div className="relative">
          <LaptopSvg height={screenWidth < 768 ? 300 : 380} width={screenWidth < 768 ? 300 : 380} color="#D5FEC4"/>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 self-start">{t("delete_account_title")}</h2>

        {/* Message */}
        <p className="text-gray-700 text-start mb-6 text-xl">
          {userName}, {t("delete_account_message")}
        </p>
         <div className="w-full mb-6">
          <Dropdown
            value={deleteReason}
            onChange={(e: DropdownChangeEvent) => setDeleteReason?.(e.value)}
            options={reasonOptions}
            placeholder={t("choose_a_reason_placeholder")}
            className="w-full p-0"
            panelClassName="rounded-md"
            pt={{
              root: { className: "w-full border" },
              input: { className: "p-4  rounded-md text-gray-700" },
              panel: { className: "rounded-md" },
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-4">
          <CustomButton
            label={t("cancel_label")}
            onClick={onHide}
            className="flex-1 py-3 border border-gray-500 rounded-full bg-white text-gray-700 hover:bg-gray-50"
          />
          <CustomButton
            label={t("delete_account_title")}
            onClick={onConfirm}
            loading={loading}
            className="flex-1 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 px-4"
          />
        </div>
      </div>
    </CustomDialog>
  )
}

