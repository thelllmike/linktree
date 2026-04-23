'use client'

import { useState, useActionState } from 'react'
import { addBankAccount, updateBankAccount, deleteBankAccount } from '@/app/actions'
import { BankAccount } from '@/types'
import { useRouter } from 'next/navigation'

interface Props {
  businessId: string
  accounts: BankAccount[]
}

type FormState = { error?: string; success?: boolean }

const INIT: FormState = { error: undefined, success: false }

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-[#888] uppercase tracking-widest">
      {children}
    </label>
  )
}

function AddBankAccountForm({ businessId, onSuccess }: { businessId: string; onSuccess: () => void }) {
  const addWithId = addBankAccount.bind(null, businessId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const result = await addWithId(formData)
      if (result?.success) {
        onSuccess()
        return INIT
      }
      return result ?? INIT
    },
    INIT
  )

  return (
    <form action={formAction} className="space-y-4 bg-[#0F0F0F] border border-[#C8FF00]/30 rounded-2xl p-5">
      <h4 className="text-white text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
        Add Bank Account
      </h4>

      {state.error && (
        <div className="bg-red-950/50 border border-red-800 text-red-300 text-xs px-3 py-2 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <FieldLabel>Bank Name</FieldLabel>
        <input
          type="text"
          name="bank_name"
          required
          placeholder="Bank of Ceylon"
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel>Account Name</FieldLabel>
        <input
          type="text"
          name="account_name"
          required
          placeholder="Sevana Engineering"
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel>Account Number</FieldLabel>
        <input
          type="text"
          name="account_number"
          required
          placeholder="91699878"
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm font-mono"
        />
      </div>

      <div className="space-y-1.5">
        <FieldLabel>Branch <span className="text-[#555] normal-case">(optional)</span></FieldLabel>
        <input
          type="text"
          name="branch"
          placeholder="Polgahawela"
          className="w-full bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-white placeholder-[#444] focus:outline-none focus:border-[#C8FF00] transition-colors text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#C8FF00] text-black text-sm font-semibold py-2.5 rounded-xl hover:bg-[#D4FF33] transition-colors disabled:opacity-50"
      >
        {isPending ? 'Adding...' : 'Add Bank Account'}
      </button>
    </form>
  )
}

function BankAccountRow({ account, businessId }: { account: BankAccount; businessId: string }) {
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setDeleting(true)
    await deleteBankAccount(account.id, businessId)
    router.refresh()
  }

  const updateWithIds = updateBankAccount.bind(null, account.id, businessId)
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const result = await updateWithIds(formData)
      if (result?.success) {
        setEditing(false)
        router.refresh()
        return {}
      }
      return result ?? {}
    },
    {} as FormState
  )

  if (editing) {
    return (
      <form action={formAction} className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-4 space-y-3">
        {state.error && <p className="text-red-400 text-xs">{state.error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#666] mb-1">Bank</label>
            <input
              type="text"
              name="bank_name"
              required
              defaultValue={account.bank_name}
              className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C8FF00]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#666] mb-1">Branch</label>
            <input
              type="text"
              name="branch"
              defaultValue={account.branch ?? ''}
              className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C8FF00]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#666] mb-1">Account Name</label>
          <input
            type="text"
            name="account_name"
            required
            defaultValue={account.account_name}
            className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C8FF00]"
          />
        </div>

        <div>
          <label className="block text-xs text-[#666] mb-1">Account Number</label>
          <input
            type="text"
            name="account_number"
            required
            defaultValue={account.account_number}
            className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#C8FF00] font-mono"
          />
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={() => setEditing(false)} className="flex-1 border border-[#2A2A2A] text-[#888] text-xs py-2 rounded-lg hover:text-white transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isPending} className="flex-1 bg-[#C8FF00] text-black text-xs font-semibold py-2 rounded-lg hover:bg-[#D4FF33] transition-colors disabled:opacity-50">
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="flex items-start gap-3 bg-[#141414] border border-[#2A2A2A] rounded-xl px-4 py-3 group hover:border-[#333] transition-colors">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#1F2937] text-[#60A5FA]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18" />
          <path d="M3 10h18" />
          <path d="M5 6l7-3 7 3" />
          <path d="M4 10v11" />
          <path d="M20 10v11" />
          <path d="M8 14v3" />
          <path d="M12 14v3" />
          <path d="M16 14v3" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{account.bank_name}</p>
        <p className="text-[#aaa] text-xs truncate">{account.account_name}</p>
        <p className="text-[#C8FF00]/80 text-xs truncate font-mono mt-0.5">
          {account.account_number}
          {account.branch ? <span className="text-[#555]"> · {account.branch}</span> : null}
        </p>
      </div>
      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#666] hover:text-white hover:border-[#444] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#2A2A2A] text-[#666] hover:text-red-400 hover:border-red-900 transition-colors disabled:opacity-50"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export function BankAccountsManager({ businessId, accounts }: Props) {
  const [showAdd, setShowAdd] = useState(false)
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
            Bank Accounts
          </h3>
          <p className="text-[#555] text-xs mt-0.5">{accounts.length} account{accounts.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
            showAdd ? 'bg-[#2A2A2A] text-[#888]' : 'bg-[#C8FF00] text-black hover:bg-[#D4FF33]'
          }`}
        >
          {showAdd ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Bank Account
            </>
          )}
        </button>
      </div>

      {showAdd && (
        <AddBankAccountForm
          businessId={businessId}
          onSuccess={() => {
            setShowAdd(false)
            router.refresh()
          }}
        />
      )}

      {accounts.length === 0 && !showAdd ? (
        <div className="text-center py-10 border border-dashed border-[#2A2A2A] rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2">
              <path d="M3 21h18" />
              <path d="M5 6l7-3 7 3" />
              <path d="M4 10v11" />
              <path d="M20 10v11" />
            </svg>
          </div>
          <p className="text-[#555] text-sm">No bank accounts yet</p>
          <p className="text-[#444] text-xs mt-1">Add bank details so customers can pay you</p>
        </div>
      ) : (
        <div className="space-y-2">
          {accounts.map((acc) => (
            <BankAccountRow key={acc.id} account={acc} businessId={businessId} />
          ))}
        </div>
      )}
    </div>
  )
}
