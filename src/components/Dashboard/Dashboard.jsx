import React, { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  FileText,
  BookOpen,
  Building2,
  ClipboardList,
  Key,
  User,
  LogOut,
  Menu,
  DollarSign,
  FormInput,
  X,
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ModuleTable from "../Moduletable"
import ProfileForm from "./ProfileForm"
import DSC from "./DSC"
import Task from "./Task"
import EmployeeTaskManager from "./Employeetask"
import logo from "../../assets/logo.png"
import IncomeTax from "./IncomeTax"
import TDS from "./TDS"
import Audit from "./Audit"
import GST from "./GST"
import ROC from "./ROC"
import NewReqForm from "./NewReqForm"

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [activeModule, setActiveModule] = useState("income-tax")
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  const modules = [
    { id: "income-tax", name: "Income Tax", icon: <Calculator />, color: "from-blue-600 to-blue-800" },
    { id: "tds", name: "TDS", icon: <FileText />, color: "from-blue-600 to-blue-800" },
    { id: "audit", name: "Audit 3CA-3CB", icon: <BookOpen />, color: "from-blue-600 to-blue-800" },
    { id: "gst", name: "GST", icon: <DollarSign />, color: "from-blue-600 to-blue-800" },
    { id: "roc", name: "ROC", icon: <Building2 />, color: "from-blue-600 to-blue-800" },
    { id: "task", name: "Task Manager", icon: <ClipboardList />, color: "from-blue-600 to-blue-800" },
    { id: "dsc", name: "DSC Manager", icon: <Key />, color: "from-blue-600 to-blue-800" },
    { id: "employee", name: "Employee Task Manager", icon: <User />, color: "from-blue-600 to-blue-800" },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const handleContentClick = () => {
    if (isSidebarOpen && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const ClientDetailsCard = () => {
    return (
      <div className="gap-4 bg-gray-700 p-2 rounded-sm">
        <div className="flex justify-between items-center ">
          <h3 className="text-xl font-bold text-blue-300">Client Profile</h3>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-white"><span className="font-semibold text-blue-200">Name:</span> Ajay Kumar</p>
          <p className="text-sm text-white"><span className="font-semibold text-blue-200">Validity:</span> 22/03/2025 - 21/03/2026</p>
          <p className="text-sm text-white"><span className="font-semibold text-blue-200">Activation Code:</span> 12345687</p>
        </div>
      </div>
    )
  }

  const RequestModal = () => {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">New Request</h2>
            <button 
              onClick={() => setIsRequestModalOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <NewReqForm />
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <motion.div
        className={`
          fixed md:sticky md:top-0
          z-30 md:z-auto
          h-screen
          bg-gradient-to-b from-gray-900 to-gray-800 
          text-white
          shadow-xl
          flex flex-col
          ${isSidebarOpen ? "w-64" : "w-0 md:w-20"}
          transition-all duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-hidden
        `}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <>
            <div className="p-4 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
              {isSidebarOpen && (
                <h1 className="font-bold text-xl">
                  <span className="text-blue-400">CA</span> Dashboard
                </h1>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-2 md:p-4">
                <ul className="space-y-2">
                  {modules.map((module) => (
                    <li key={module.id}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveModule(module.id)
                          if (window.innerWidth < 768) setSidebarOpen(false)
                        }}
                        className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ${activeModule === module.id
                          ? `bg-gradient-to-r ${module.color} text-white shadow-lg`
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                      >
                        <span className="flex-shrink-0 mr-3">{module.icon}</span>
                        {isSidebarOpen && <span className="font-medium truncate">{module.name}</span>}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="p-2 md:p-4 border-t border-gray-700 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveModule("profile")
                  if (window.innerWidth < 768) setSidebarOpen(false)
                }}
                className="w-full flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <User className="flex-shrink-0 mr-3" />
                {isSidebarOpen && <span className="font-medium">Profile</span>}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center p-2 rounded-lg hover:bg-red-600 transition-colors duration-200 mt-2 text-red-400 hover:text-white"
              >
                <LogOut className="flex-shrink-0 mr-3" />
                {isSidebarOpen && <span className="font-medium">Logout</span>}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-auto overflow-hidden" onClick={handleContentClick}>
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-10 p-4">
          <div className="flex justify-between">
            <Link to="/">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-300"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <header className="hidden md:block bg-gradient-to-r from-gray-900 to-gray-800 shadow-md p-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Link to="/">
              <img src={logo || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
            </Link>
            
            <div className="flex justify-center items-center gap-6">
              {/* client details in the cart */}
              <ClientDetailsCard />
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2 shadow-md"
              >
               
                <span>New Request</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-100 to-gray-200 mt-20 md:mt-0">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              key={activeModule}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-3xl font-bold mb-6 text-gray-800 text-center `}
            >
              {modules.find((m) => m.id === activeModule)?.name || "Dashboard"}
            </motion.h2>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeModule === "income-tax" ? (
                  <IncomeTax />
                ) : activeModule === "tds" ? (
                  <TDS />
                ) : activeModule === "audit" ? (
                  <Audit />
                ) : activeModule === "gst" ? (
                  <GST />
                ) : activeModule === "dsc" ? (
                  <DSC />
                ) : activeModule === "roc" ? (
                  <ROC />
                ) : activeModule === "task" ? (
                  <Task />
                ) : activeModule === "profile" ? (
                  <ProfileForm />
                ) : activeModule === "employee" ? (
                  <EmployeeTaskManager />
                ) : (
                  <ModuleTable
                    module={activeModule}
                    columns={modules.find((m) => m.id === activeModule)?.columns || []}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {isRequestModalOpen && <RequestModal />}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard