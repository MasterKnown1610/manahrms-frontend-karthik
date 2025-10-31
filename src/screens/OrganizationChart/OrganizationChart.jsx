import { useState, useMemo, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  MarkerType,
  useReactFlow,
  Panel,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { MdArrowBack, MdFullscreen, MdFitScreen, MdZoomIn, MdZoomOut } from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';
import employeesData from '../../data/employeesData.json';
import './OrganizationChart.scss';

const OrganizationChartControls = () => {
  const { fitView, zoomIn, zoomOut, getViewport } = useReactFlow();
  const { theme } = useTheme();

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.2, duration: 800 });
  }, [fitView]);

  const handleZoomIn = useCallback(() => {
    zoomIn({ duration: 300 });
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut({ duration: 300 });
  }, [zoomOut]);

  return (
    <Panel position="top-right" className="org-chart__controls-panel">
      <Space direction="vertical" size="small">
        <Button
          icon={<MdFitScreen />}
          onClick={handleFitView}
          title="Fit to View"
          style={{
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.secondary,
            color: theme.colors.text.primary,
          }}
        />
        <Button
          icon={<MdZoomIn />}
          onClick={handleZoomIn}
          title="Zoom In"
          style={{
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.secondary,
            color: theme.colors.text.primary,
          }}
        />
        <Button
          icon={<MdZoomOut />}
          onClick={handleZoomOut}
          title="Zoom Out"
          style={{
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.secondary,
            color: theme.colors.text.primary,
          }}
        />
      </Space>
    </Panel>
  );
};

const OrganizationChart = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Build initial nodes and edges from employee data
  const initialNodesAndEdges = useMemo(() => {
    const nodeMap = new Map();
    const edgeList = [];

    // Find root (CEO or person without manager)
    const root = employeesData.find((emp) => !emp.managerId);

    if (!root) return { nodes: [], edges: [] };

    // Build tree structure first
    const buildTree = (employeeId) => {
      const employee = employeesData.find((emp) => emp.id === employeeId);
      if (!employee) return null;

      const children = employeesData
        .filter((emp) => emp.managerId === employeeId)
        .map((child) => buildTree(child.id))
        .filter(Boolean);

      return { employee, children };
    };

    const tree = buildTree(root.id);
    if (!tree) return { nodes: [], edges: [] };

    // Calculate positions using hierarchical layout
    const HORIZONTAL_SPACING = 350; // Increased horizontal spacing between nodes
    const VERTICAL_SPACING = 280; // Increased vertical spacing between levels
    const NODE_WIDTH = 200;
    const NODE_HEIGHT = 180; // Approximate height of node

    const calculatePositions = (treeNode, level = 0, x = 0, index = 0) => {
      const { employee, children } = treeNode;
      const nodeId = employee.id.toString();
      const nodeY = level * VERTICAL_SPACING + 80; // More top padding

      let nodeX = x;
      let nextX = x;

      // Calculate children positions first
      if (children.length > 0) {
        const childSpacing = HORIZONTAL_SPACING;
        const totalWidth = (children.length - 1) * childSpacing;
        const startX = x - totalWidth / 2;

        // Recursively calculate all children positions first
        children.forEach((child, childIndex) => {
          const childX = startX + childIndex * childSpacing;
          const childNextX = calculatePositions(child, level + 1, childX, childIndex);
          nextX = Math.max(nextX, childNextX);
        });

        // Center parent above children
        const firstChildX = startX;
        const lastChildX = startX + (children.length - 1) * childSpacing;
        nodeX = (firstChildX + lastChildX) / 2 - NODE_WIDTH / 2 + 100;
      } else {
        // Leaf node - position based on sibling index
        nodeX = x;
        nextX = x + HORIZONTAL_SPACING;
      }

      // Create node
      const node = {
        id: nodeId,
        type: 'default',
        position: { x: nodeX, y: nodeY },
        data: {
          label: (
            <div className="org-chart__node-content">
              <div className="org-chart__node-avatar">
                <img src={employee.avatar} alt={employee.name} />
              </div>
              <div className="org-chart__node-name">{employee.name}</div>
              <div className="org-chart__node-role">{employee.role}</div>
            </div>
          ),
        },
        style: {
          background: employee.isManager ? theme.colors.primary + '15' : theme.colors.white,
          border: `2px solid ${employee.isManager ? theme.colors.primary : theme.colors.secondary}`,
          borderRadius: '12px',
          padding: '20px',
          width: '220px',
          minHeight: '160px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      };

      nodeMap.set(nodeId, node);

      // Create edges to children
      children.forEach((child) => {
        const childNodeId = child.employee.id.toString();
        edgeList.push({
          id: `${nodeId}-${childNodeId}`,
          source: nodeId,
          target: childNodeId,
          type: 'smoothstep',
          animated: false,
          style: { stroke: theme.colors.secondary, strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: theme.colors.secondary,
          },
        });
      });

      return nextX;
    };

    // Start calculation from center
    const centerX = window.innerWidth / 2 - 100;
    calculatePositions(tree, 0, centerX, 0);

    // Center all nodes
    const nodeArray = Array.from(nodeMap.values());
    if (nodeArray.length > 0) {
      const minX = Math.min(...nodeArray.map((n) => n.position.x));
      const maxX = Math.max(...nodeArray.map((n) => n.position.x));
      const centerOffset = (minX + maxX) / 2;
      const screenCenter = window.innerWidth / 2;

      nodeArray.forEach((node) => {
        node.position.x = node.position.x - centerOffset + screenCenter - 100;
      });
    }

    return {
      nodes: nodeArray,
      edges: edgeList,
    };
  }, [theme]);

  // Initialize nodes and edges state
  const [nodes, setNodes] = useState(() => initialNodesAndEdges.nodes);
  const [edges, setEdges] = useState(() => initialNodesAndEdges.edges);

  // Update nodes state when initial nodes change (e.g., theme change)
  useEffect(() => {
    setNodes(initialNodesAndEdges.nodes);
    setEdges(initialNodesAndEdges.edges);
  }, [initialNodesAndEdges]);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  return (
    <div className="org-chart">
      <div className="org-chart__header">
        <div className="org-chart__header-left">
          <Button
            icon={<MdArrowBack />}
            onClick={() => navigate('/employee?tab=teams')}
            size="large"
            style={{
              marginRight: '16px',
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.secondary,
            }}
          >
            Back
          </Button>
          <div>
            <h1 className="org-chart__title">Corporate / Organization</h1>
            <p className="org-chart__subtitle">Type The Subtitle Of Your Great Here</p>
          </div>
        </div>
      </div>

      <div className="org-chart__canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2, duration: 800 }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnScroll={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnDrag={false} // Disable pan on drag to allow node dragging with left mouse button
          selectionOnDrag={false}
          defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
          minZoom={0.2}
          maxZoom={3}
          snapToGrid={false}
          snapGrid={[20, 20]}
          preventScrolling={false}
          attributionPosition="bottom-left"
        >
          <Background color={theme.colors.background} gap={20} />
          <Controls
            showZoom={true}
            showFitView={true}
            showInteractive={true}
            style={{
              backgroundColor: theme.colors.white,
              border: `1px solid ${theme.colors.secondary}`,
            }}
          />
          <MiniMap
            nodeColor={(node) => {
              const emp = employeesData.find((e) => e.id.toString() === node.id);
              return emp?.isManager ? theme.colors.primary : theme.colors.secondary;
            }}
            maskColor={theme.colors.background + '80'}
            style={{
              backgroundColor: theme.colors.white,
              border: `1px solid ${theme.colors.secondary}`,
            }}
            pannable={true}
            zoomable={true}
          />
          <OrganizationChartControls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default OrganizationChart;

