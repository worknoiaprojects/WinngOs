import React, { useState } from 'react';
import {
  Utensils,
  ShoppingBag,
  Bike,
  Users,
  Clock,
  ArrowRightLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { FloorTable, OrderMode, DeliveryPartner } from '../../../types/pos';
import { INITIAL_FLOOR_ZONES } from '../../../mock/posData';
import './TableSessionManager.css';

export interface TableSessionManagerProps {
  tables: FloorTable[];
  selectedTableId: string | null;
  onSelectTable: (table: FloorTable) => void;
  orderMode: OrderMode;
  onOrderModeChange: (mode: OrderMode) => void;
  deliveryPartner: DeliveryPartner;
  onDeliveryPartnerChange: (partner: DeliveryPartner) => void;
  takeawayTokenNumber: number;
  onNewTakeawayToken: () => void;
  onOpenTransferModal?: () => void;
}

export const TableSessionManager: React.FC<TableSessionManagerProps> = ({
  tables,
  selectedTableId,
  onSelectTable,
  orderMode,
  onOrderModeChange,
  deliveryPartner,
  onDeliveryPartnerChange,
  takeawayTokenNumber,
  onNewTakeawayToken,
  onOpenTransferModal,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');

  // Filter tables by selected zone
  const filteredTables = selectedZone === 'All'
    ? tables
    : tables.filter((t) => t.floorZone === selectedZone);

  // Live status counts
  const availableCount = tables.filter((t) => t.status === 'available').length;
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length;
  const billedCount = tables.filter((t) => t.status === 'billed').length;

  return (
    <aside className="table-session-manager" aria-label="Table and Session Manager">
      {/* 1. Header & Order Mode Segmented Switcher */}
      <div className="tsm-header">
        <div className="tsm-title-row">
          <div>
            <h2 className="tsm-title">Floor & Session</h2>
            <p className="tsm-subtitle">Table layout & order context</p>
          </div>
          {orderMode === 'DINE_IN' && selectedTableId && (
            <span className="tsm-active-table-pill" title="Currently Selected Table">
              {tables.find((t) => t.tableId === selectedTableId)?.tableNumber || 'Selected'}
            </span>
          )}
        </div>

        {/* Segmented Mode Selector */}
        <div className="tsm-mode-selector" role="tablist" aria-label="Order Mode Switcher">
          <button
            type="button"
            role="tab"
            aria-selected={orderMode === 'DINE_IN'}
            className={`tsm-mode-btn ${orderMode === 'DINE_IN' ? 'is-active' : ''}`}
            onClick={() => onOrderModeChange('DINE_IN')}
          >
            <Utensils size={14} className="tsm-mode-icon" aria-hidden="true" />
            <span>Dine In</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={orderMode === 'TAKEAWAY'}
            className={`tsm-mode-btn ${orderMode === 'TAKEAWAY' ? 'is-active' : ''}`}
            onClick={() => onOrderModeChange('TAKEAWAY')}
          >
            <ShoppingBag size={14} className="tsm-mode-icon" aria-hidden="true" />
            <span>Takeaway</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={orderMode === 'DELIVERY'}
            className={`tsm-mode-btn ${orderMode === 'DELIVERY' ? 'is-active' : ''}`}
            onClick={() => onOrderModeChange('DELIVERY')}
          >
            <Bike size={14} className="tsm-mode-icon" aria-hidden="true" />
            <span>Delivery</span>
          </button>
        </div>
      </div>

      {/* 2. Mode-Specific Sub-Header */}
      {orderMode === 'DINE_IN' && (
        <div className="tsm-zones-container">
          <div className="tsm-zones-bar" role="tablist" aria-label="Filter tables by zone">
            <button
              type="button"
              role="tab"
              aria-selected={selectedZone === 'All'}
              className={`tsm-zone-pill ${selectedZone === 'All' ? 'is-active' : ''}`}
              onClick={() => setSelectedZone('All')}
            >
              All Zones
            </button>
            {INITIAL_FLOOR_ZONES.map((zone) => (
              <button
                key={zone}
                type="button"
                role="tab"
                aria-selected={selectedZone === zone}
                className={`tsm-zone-pill ${selectedZone === zone ? 'is-active' : ''}`}
                onClick={() => setSelectedZone(zone)}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>
      )}

      {orderMode === 'TAKEAWAY' && (
        <div className="tsm-mode-panel">
          <div className="tsm-takeaway-banner">
            <div className="tsm-takeaway-info">
              <span className="tsm-takeaway-label">Active Counter Token</span>
              <span className="tsm-takeaway-token">#{takeawayTokenNumber}</span>
            </div>
            <button
              type="button"
              className="tsm-new-token-btn"
              onClick={onNewTakeawayToken}
              aria-label="Generate new takeaway token"
            >
              <Sparkles size={13} />
              <span>Next Token</span>
            </button>
          </div>
          <p className="tsm-takeaway-note">
            Items added to cart will be attached to Takeaway Token #{takeawayTokenNumber}.
          </p>
        </div>
      )}

      {orderMode === 'DELIVERY' && (
        <div className="tsm-mode-panel">
          <span className="tsm-panel-section-title">Aggregator Partner</span>
          <div className="tsm-delivery-partners" role="radiogroup" aria-label="Delivery Partner">
            {(['DIRECT', 'ZOMATO', 'SWIGGY'] as DeliveryPartner[]).map((partner) => (
              <button
                key={partner}
                type="button"
                role="radio"
                aria-checked={deliveryPartner === partner}
                className={`tsm-partner-btn ${deliveryPartner === partner ? 'is-active' : ''}`}
                onClick={() => onDeliveryPartnerChange(partner)}
              >
                <span className="tsm-partner-dot" />
                <span>{partner}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Table Matrix Grid (Dine In) */}
      {orderMode === 'DINE_IN' ? (
        <div className="tsm-table-grid-scroll" tabIndex={0} aria-label="Interactive Table Grid">
          <div className="tsm-table-grid">
            {filteredTables.map((table) => {
              const isSelected = selectedTableId === table.tableId;
              const statusClass = `status-${table.status}`;

              return (
                <div
                  key={table.tableId}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  className={`tsm-table-card ${statusClass} ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => onSelectTable(table)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectTable(table);
                    }
                  }}
                >
                  <div className="tsm-card-top">
                    <span className="tsm-table-num">{table.tableNumber}</span>
                    <span className={`tsm-status-badge badge-${table.status}`}>
                      {table.status === 'available' && <CheckCircle2 size={10} />}
                      {table.status === 'occupied' && <Clock size={10} />}
                      {table.status}
                    </span>
                  </div>

                  <div className="tsm-card-details">
                    <span className="tsm-detail-item">
                      <Users size={12} className="tsm-detail-icon" />
                      {table.status === 'occupied'
                        ? `${table.guestCount}/${table.seatingCapacity} guests`
                        : `${table.seatingCapacity} seats`}
                    </span>

                    {table.status === 'occupied' && table.sessionStartTime && (
                      <span className="tsm-detail-item tsm-timer">
                        <Clock size={12} className="tsm-detail-icon" />
                        {table.sessionStartTime}
                      </span>
                    )}
                  </div>

                  <div className="tsm-card-zone-tag">{table.floorZone}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="tsm-offline-prompt">
          <p className="tsm-offline-text">
            {orderMode === 'TAKEAWAY'
              ? 'Ready for counter ordering. Select items from the catalog.'
              : 'Direct & aggregator delivery active. Add customer details at checkout.'}
          </p>
        </div>
      )}

      {/* 4. Floor Live Summary & Quick Actions Footer */}
      <div className="tsm-footer">
        <div className="tsm-summary-stats">
          <span className="tsm-stat stat-available" title="Available Tables">
            <span className="tsm-dot" />
            <strong>{availableCount}</strong> Free
          </span>
          <span className="tsm-stat stat-occupied" title="Occupied Tables">
            <span className="tsm-dot" />
            <strong>{occupiedCount}</strong> Busy
          </span>
          <span className="tsm-stat stat-billed" title="Billed Tables">
            <span className="tsm-dot" />
            <strong>{billedCount}</strong> Billed
          </span>
        </div>

        {orderMode === 'DINE_IN' && onOpenTransferModal && (
          <button
            type="button"
            className="tsm-transfer-btn"
            onClick={onOpenTransferModal}
            aria-label="Transfer active table order"
          >
            <ArrowRightLeft size={13} />
            <span>Transfer</span>
          </button>
        )}
      </div>
    </aside>
  );
};
