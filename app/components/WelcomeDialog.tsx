'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeDialog({ isOpen, onClose }: WelcomeDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 mb-4"
                >
                  Welcome to Enterpret!
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-gray-600">
                    We bring together all your customer feedback—from surveys,
                    support tickets, reviews, and more—into one place. Enterpret
                    automatically categorizes and synthesizes feedback, helping you
                    uncover insights, trends, and opportunities.
                  </p>
                  <p className="mt-4 text-gray-600">
                    Use the AI-assistant, <strong className="text-primary">Wisdom</strong>, to ask questions
                    and instantly analyze feedback.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
                    onClick={onClose}
                  >
                    Get Started
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 